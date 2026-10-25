import React from 'react';
import Link from 'next/link';
import { Plus, BookOpen } from 'lucide-react';
import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";
import Search from "@/components/Search";
import WorldBooksCatalog from "@/components/WorldBooksCatalog";

const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
    const { query } = await searchParams;

    const bookResults = await getAllBooks(query);
    const books = bookResults.success ? bookResults.data ?? [] : [];
    const userBookSlugs = books.map((b) => b.slug);

    return (
        <main className="wrapper container pb-24">
            <HeroSection />

            {/* User's Active Library */}
            <section className="mb-14">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-[#212a3b]">
                            {query ? `Search Results for "${query}"` : 'Your Library'}
                        </h2>
                        <p className="text-sm text-[#3d485e] mt-1">
                            {books.length > 0
                                ? `${books.length} book${books.length > 1 ? 's' : ''} in your collection ready for voice discussion`
                                : 'Upload a PDF or select from the world collection below to start speaking with AI'}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Search />
                        <Link
                            href="/books/new"
                            className="hidden sm:inline-flex items-center gap-1.5 py-2 px-4 bg-[#212a3b] hover:bg-[#3d485e] text-white rounded-xl text-xs font-semibold shadow-sm transition-all whitespace-nowrap"
                        >
                            <Plus className="size-4" />
                            <span>Upload PDF</span>
                        </Link>
                    </div>
                </div>

                {books.length > 0 ? (
                    <div className="library-books-grid">
                        {books.map((book) => (
                            <BookCard
                                key={book._id}
                                title={book.title}
                                author={book.author}
                                coverURL={book.coverURL}
                                slug={book.slug}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-[#fff6e5] border-2 border-dashed border-[#8B7355]/25 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-3 shadow-inner">
                        <div className="w-14 h-14 rounded-2xl bg-[#f3e4c7] flex items-center justify-center text-2xl shadow-sm text-[#8B7355]">
                            <BookOpen className="size-7" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-[#212a3b]">
                            {query ? 'No books matched your search' : 'Your Personal Library is Empty'}
                        </h3>
                        <p className="text-sm text-[#3d485e] max-w-md">
                            {query
                                ? 'Try searching with different keywords, or clear the search to see all books.'
                                : 'Pick any world-famous book from the collection below, click "Add & Upload PDF", and your AI companion will be ready to converse.'}
                        </p>
                        <Link
                            href="/books/new"
                            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-[#212a3b] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#3d485e] shadow-sm transition-all"
                        >
                            <Plus className="size-4" />
                            <span>Upload Custom PDF</span>
                        </Link>
                    </div>
                )}
            </section>

            {/* Curated World Books Catalog */}
            <WorldBooksCatalog userBookSlugs={userBookSlugs} />
        </main>
    );
};

export default Page
