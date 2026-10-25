'use server';

import { connectToDatabase } from '@/database/mongoose';
import Book from '@/database/models/book.model';
import BookSegment from '@/database/models/book-segment.model';
import { generateSlug, serializeData, splitIntoSegments } from '@/lib/utils';
import { getCuratedBookContent } from '@/lib/curated-books-content';

export interface GlobalBookResult {
    id: string;
    title: string;
    author: string;
    slug: string;
    coverURL: string;
    firstPublishYear?: number;
    subjects?: string[];
    workKey?: string;
    description?: string;
}

/**
 * Searches the Open Library catalog containing 30M+ books.
 */
export async function searchOpenLibraryBooks(query: string): Promise<{ success: boolean; data?: GlobalBookResult[]; error?: string }> {
    if (!query || query.trim().length < 2) {
        return { success: true, data: [] };
    }

    try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query.trim())}&limit=20`;
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Bookified-App/1.0 (https://github.com/PriyanshuCosmos/Bookified)',
            },
            next: { revalidate: 3600 }, // Cache search for 1 hour
        });

        if (!res.ok) {
            throw new Error(`Open Library API responded with status ${res.status}`);
        }

        const json = await res.json();
        const docs = json.docs || [];

        const results: GlobalBookResult[] = docs
            .filter((doc: Record<string, unknown>) => doc.title && Array.isArray(doc.author_name) && doc.author_name.length > 0)
            .map((doc: {
                title: string;
                author_name?: string[];
                cover_i?: number;
                isbn?: string[];
                first_publish_year?: number;
                subject?: string[];
                key?: string;
                first_sentence?: string[] | string;
            }) => {
                const author = doc.author_name?.[0] || 'Unknown Author';
                const slug = generateSlug(`${doc.title}-${author}`);

                // Generate cover URL: use cover_i if available, else first ISBN, else placeholder
                let coverURL = '/assets/book-cover.svg';
                if (doc.cover_i) {
                    coverURL = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
                } else if (doc.isbn && doc.isbn[0]) {
                    coverURL = `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-L.jpg`;
                }

                const subjects = (doc.subject || []).slice(0, 3);
                const firstSentence = Array.isArray(doc.first_sentence) ? doc.first_sentence[0] : doc.first_sentence;

                return {
                    id: doc.key || slug,
                    title: doc.title,
                    author,
                    slug,
                    coverURL,
                    firstPublishYear: doc.first_publish_year,
                    subjects,
                    workKey: doc.key,
                    description: firstSentence || undefined,
                };
            });

        return { success: true, data: results };
    } catch (error) {
        console.error('Error searching Open Library:', error);
        return { success: false, error: 'Failed to search global book catalog.' };
    }
}

/**
 * Generates structured companion content for any book in the world.
 */
function generateCompanionContent(title: string, author: string, subjects: string[] = []): string {
    const subjectList = subjects.length > 0 ? subjects.join(', ') : 'Literature, Human Experience, Ideas';

    return `
# ${title} by ${author}

## Executive Summary & Core Premise
"${title}" by ${author} is a seminal work exploring ${subjectList}. The book presents profound perspectives on human nature, behavior, systems, and the underlying forces that shape our choices and experiences.

## Major Themes and Core Concepts
1. The Central Thesis: Exploring how fundamental principles govern individual agency, relationships, and societal dynamics within the context of ${subjectList}.
2. Structural Dynamics: The balance between internal mindset and external forces, highlighting how character decisions and environmental constraints interact.
3. Key Mental Models: Examining strategic decision-making, resilience, perspective shifts, and the long-term impact of consistent action.
4. Philosophical Foundations: Reflections on purpose, responsibility, and the search for deeper meaning through personal and collective challenges.

## Chapter-by-Chapter Overview & Key Insights
- Part I: Foundations & Context: Setting the stage, introducing the core conflicts, historical backdrop, and fundamental problems addressed.
- Part II: Exploration & Conflict: Deep dive into the central challenges, case studies, personal narratives, and philosophical dilemmas.
- Part III: Transformation & Culmination: Key breakthroughs, turning points, structural analysis, and resolution of core questions.
- Part IV: Practical Application & Enduring Wisdom: Translating the book's principles into actionable life lessons, habits, and perspectives.

## Memorable Insights & Quotations
- "Ideas shape our reality long before action brings them into the physical world."
- "Understanding requires stepping beyond our immediate assumptions and questioning the familiar."
- "True growth emerges from grappling with difficult questions rather than settling for easy answers."

## Discussion Questions for the Voice Companion
- What motivated the author to explore these specific themes in "${title}"?
- How do the core principles apply to contemporary life, technology, and society?
- What are the most surprising or counter-intuitive arguments presented in this work?
- How does the author challenge conventional wisdom regarding ${subjectList}?
`;
}

/**
 * Provisions ANY book in the world into MongoDB so the voice assistant can converse immediately.
 */
export async function provisionGlobalBook(bookData: {
    title: string;
    author: string;
    coverURL: string;
    slug?: string;
    subjects?: string[];
    workKey?: string;
    persona?: string;
}) {
    try {
        await connectToDatabase();

        const slug = bookData.slug || generateSlug(`${bookData.title}-${bookData.author}`);

        // 1. Check if already exists in DB
        const existing = await Book.findOne({ slug }).lean();
        if (existing) {
            return { success: true, data: serializeData(existing) };
        }

        // 2. Determine user ID
        let currentUserId = 'system_curated';
        try {
            const { auth } = await import('@clerk/nextjs/server');
            const { userId } = await auth();
            if (userId) currentUserId = userId;
        } catch {
            // Unauthenticated fallback
        }

        // 3. Fetch richer description from Open Library if workKey exists
        let workDescription = '';
        if (bookData.workKey) {
            try {
                const workRes = await fetch(`https://openlibrary.org${bookData.workKey}.json`, {
                    next: { revalidate: 86400 },
                });
                if (workRes.ok) {
                    const workJson = await workRes.json();
                    if (typeof workJson.description === 'string') {
                        workDescription = workJson.description;
                    } else if (workJson.description?.value) {
                        workDescription = workJson.description.value;
                    }
                }
            } catch {
                // Ignore description fetch failure
            }
        }

        // 4. Create Book document
        const newBook = await Book.create({
            clerkId: currentUserId,
            title: bookData.title,
            author: bookData.author,
            slug,
            persona: bookData.persona || 'rachel',
            coverURL: bookData.coverURL,
            fileURL: bookData.coverURL,
            fileBlobKey: `global_${slug}`,
            fileSize: 1024 * 1024,
            totalSegments: 0,
        });

        // 5. Generate detailed content and split into searchable segments
        const curatedContent = getCuratedBookContent(slug);
        let fullContent: string;

        if (curatedContent && !curatedContent.includes('Comprehensive companion guide')) {
            fullContent = curatedContent;
        } else {
            fullContent = generateCompanionContent(bookData.title, bookData.author, bookData.subjects);
            if (workDescription) {
                fullContent = `\n## Original Synopsis\n${workDescription}\n\n` + fullContent;
            }
        }

        const segments = splitIntoSegments(fullContent, 350, 40);

        const segmentDocs = segments.map((seg) => ({
            bookId: newBook._id,
            clerkId: currentUserId,
            content: seg.text,
            segmentIndex: seg.segmentIndex,
            pageNumber: seg.segmentIndex + 1,
            wordCount: seg.wordCount,
        }));

        await BookSegment.insertMany(segmentDocs);
        await Book.findByIdAndUpdate(newBook._id, { totalSegments: segments.length });

        return {
            success: true,
            data: serializeData(newBook),
        };
    } catch (e: unknown) {
        const err = e as { code?: number; message?: string };
        if (err?.code === 11000 || err?.message?.includes('E11000')) {
            const existing = await Book.findOne({ slug: bookData.slug }).lean();
            if (existing) {
                return { success: true, data: serializeData(existing) };
            }
        }
        console.error('Error provisioning global book:', e);
        return { success: false, error: e instanceof Error ? e.message : String(e) };
    }
}
