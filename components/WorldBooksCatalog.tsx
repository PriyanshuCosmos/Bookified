'use client';

import React, { useState, useMemo, useRef, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import {
    Search,
    BookOpen,
    Upload,
    Mic,
    CheckCircle2,
    X,
    FileText,
    Loader2,
    Sparkles,
    Volume2,
    Globe2,
    Compass,
    Calendar,
    ArrowRight,
} from 'lucide-react';

import {
    curatedWorldBooks,
    CuratedBook,
    voiceOptions,
    DEFAULT_VOICE,
    ACCEPTED_PDF_TYPES,
    MAX_FILE_SIZE,
} from '@/lib/constants';
import { parsePDFFile } from '@/lib/utils';
import { upload } from '@vercel/blob/client';
import { checkBookExists, createBook, saveBookSegments, provisionCuratedBook } from '@/lib/actions/book.actions';
import { searchOpenLibraryBooks, provisionGlobalBook, GlobalBookResult } from '@/lib/actions/global-books.actions';

interface WorldBooksCatalogProps {
    userBookSlugs: string[];
}

const CATEGORIES = [
    'All',
    'Self-Growth',
    'Psychology',
    'Technology',
    'Finance',
    'Philosophy',
    'Classics',
] as const;

export default function WorldBooksCatalog({ userBookSlugs }: WorldBooksCatalogProps) {
    const router = useRouter();
    const { userId } = useAuth();
    const [isPending, startTransition] = useTransition();

    // Mode tab: 'curated' | 'global'
    const [activeTab, setActiveTab] = useState<'curated' | 'global'>('curated');

    // Curated tab state
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Global Search tab state
    const [globalQuery, setGlobalQuery] = useState('');
    const [globalResults, setGlobalResults] = useState<GlobalBookResult[]>([]);
    const [isSearchingGlobal, setIsSearchingGlobal] = useState(false);
    const [hasSearchedGlobal, setHasSearchedGlobal] = useState(false);

    // Provisioning state for 1-click talk
    const [provisioningSlug, setProvisioningSlug] = useState<string | null>(null);

    // Custom PDF Upload Modal State
    const [activeBookForUpload, setActiveBookForUpload] = useState<{
        title: string;
        author: string;
        coverURL: string;
        category?: string;
        description?: string;
    } | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [selectedVoice, setSelectedVoice] = useState<string>(DEFAULT_VOICE);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStep, setUploadStep] = useState<string>('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Filter curated books
    const filteredCuratedBooks = useMemo(() => {
        return curatedWorldBooks.filter((book) => {
            const matchesCategory =
                selectedCategory === 'All' || book.category === selectedCategory;
            const matchesSearch =
                searchQuery.trim() === '' ||
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    // Perform Global Open Library Search
    const handleGlobalSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const q = globalQuery.trim();
        if (q.length < 2) {
            toast.info('Please enter at least 2 characters to search.');
            return;
        }

        setIsSearchingGlobal(true);
        setHasSearchedGlobal(true);

        try {
            const res = await searchOpenLibraryBooks(q);
            if (res.success && res.data) {
                setGlobalResults(res.data);
            } else {
                toast.error(res.error || 'Failed to search world catalog');
            }
        } catch {
            toast.error('Search failed. Please try again.');
        } finally {
            setIsSearchingGlobal(false);
        }
    };

    // Instant Start for Curated Books
    const handleInstantStartCurated = async (book: CuratedBook) => {
        if (!userId) {
            toast.info('Please sign in to start speaking with this book.');
            router.push('/sign-in');
            return;
        }

        try {
            setProvisioningSlug(book.slug);
            const res = await provisionCuratedBook(book.slug);
            if (!res.success) {
                toast.error(res.error || 'Failed to start book companion');
                setProvisioningSlug(null);
                return;
            }
            toast.success(`Opening conversation with "${book.title}"...`);
            router.push(`/books/${book.slug}`);
        } catch (error) {
            console.error('Instant start error:', error);
            toast.error('Failed to open book companion');
            setProvisioningSlug(null);
        }
    };

    // Instant Start for ANY Global Book
    const handleInstantStartGlobal = async (book: GlobalBookResult) => {
        if (!userId) {
            toast.info('Please sign in to start speaking with this book.');
            router.push('/sign-in');
            return;
        }

        try {
            setProvisioningSlug(book.slug);
            toast.info(`Preparing "${book.title}" with chapter insights...`);

            const res = await provisionGlobalBook({
                title: book.title,
                author: book.author,
                coverURL: book.coverURL,
                slug: book.slug,
                subjects: book.subjects,
                workKey: book.workKey,
            });

            if (!res.success || !res.data) {
                toast.error(res.error || 'Failed to initialize book');
                setProvisioningSlug(null);
                return;
            }

            toast.success(`"${book.title}" is ready! Launching voice companion...`);
            router.push(`/books/${res.data.slug}`);
        } catch (error) {
            console.error('Global book provision error:', error);
            toast.error('Failed to prepare book companion');
            setProvisioningSlug(null);
        }
    };

    // Custom PDF Upload Modal Handlers
    const handleOpenUploadModal = (book: {
        title: string;
        author: string;
        coverURL: string;
        category?: string;
        description?: string;
    }) => {
        setActiveBookForUpload(book);
        setPdfFile(null);
        setSelectedVoice(DEFAULT_VOICE);
        setIsUploading(false);
        setUploadStep('');
    };

    const handleCloseUploadModal = () => {
        if (isUploading) return;
        setActiveBookForUpload(null);
        setPdfFile(null);
    };

    const handleFileSelected = (file: File) => {
        if (!ACCEPTED_PDF_TYPES.includes(file.type) && !file.name.toLowerCase().endsWith('.pdf')) {
            toast.error('Please select a valid PDF file.');
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            toast.error('File size exceeds the 50MB limit.');
            return;
        }
        setPdfFile(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelected(e.dataTransfer.files[0]);
        }
    };

    const handleCustomPdfUpload = async () => {
        if (!activeBookForUpload) return;

        if (!userId) {
            toast.error('Please sign in first to upload custom books.');
            router.push('/sign-in');
            return;
        }

        if (!pdfFile) {
            toast.error('Please attach the PDF file for this book.');
            return;
        }

        setIsUploading(true);

        try {
            setUploadStep('Checking existing books...');
            const existsCheck = await checkBookExists(activeBookForUpload.title);
            if (existsCheck.exists && existsCheck.book) {
                toast.info(`"${activeBookForUpload.title}" is already in your library!`);
                handleCloseUploadModal();
                router.push(`/books/${existsCheck.book.slug}`);
                return;
            }

            const fileTitle = activeBookForUpload.title.replace(/\s+/g, '-').toLowerCase();

            setUploadStep('Extracting book text and pages from PDF...');
            const parsedPDF = await parsePDFFile(pdfFile);

            if (!parsedPDF.content || parsedPDF.content.length === 0) {
                toast.error('Failed to parse text from PDF. Please make sure the PDF has readable text.');
                setIsUploading(false);
                return;
            }

            setUploadStep('Uploading PDF to cloud storage...');
            const uploadedPdfBlob = await upload(fileTitle, pdfFile, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                contentType: 'application/pdf',
            });

            setUploadStep('Setting up book cover artwork...');
            let coverUrl = activeBookForUpload.coverURL;
            try {
                if (activeBookForUpload.coverURL.startsWith('http')) {
                    const coverRes = await fetch(activeBookForUpload.coverURL);
                    if (coverRes.ok) {
                        const blob = await coverRes.blob();
                        const uploadedCoverBlob = await upload(`${fileTitle}_cover.jpg`, blob, {
                            access: 'public',
                            handleUploadUrl: '/api/upload',
                            contentType: 'image/jpeg',
                        });
                        coverUrl = uploadedCoverBlob.url;
                    }
                }
            } catch {
                coverUrl = activeBookForUpload.coverURL || parsedPDF.cover;
            }

            setUploadStep('Saving book to your profile...');
            const newBook = await createBook({
                clerkId: userId,
                title: activeBookForUpload.title,
                author: activeBookForUpload.author,
                persona: selectedVoice,
                fileURL: uploadedPdfBlob.url,
                fileBlobKey: uploadedPdfBlob.pathname,
                coverURL: coverUrl,
                fileSize: pdfFile.size,
            });

            if (!newBook.success || !newBook.data) {
                toast.error(newBook.error as string || 'Failed to create book profile');
                if (newBook.isBillingError) {
                    router.push('/subscriptions');
                }
                setIsUploading(false);
                return;
            }

            setUploadStep('Indexing chapters for AI voice search...');
            const segments = await saveBookSegments(newBook.data._id, userId, parsedPDF.content);

            if (!segments.success) {
                toast.error('Failed to index book segments.');
                setIsUploading(false);
                return;
            }

            toast.success(`"${activeBookForUpload.title}" added to your library!`);
            handleCloseUploadModal();
            router.push(`/books/${newBook.data.slug}`);
        } catch (error) {
            console.error('Failed to add book to profile:', error);
            toast.error('An error occurred while uploading. Please check your credentials and try again.');
        } finally {
            setIsUploading(false);
            setUploadStep('');
        }
    };

    return (
        <section className="mt-8">
            {/* Catalog Header with View Switcher */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="size-5 text-[#8B7355]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#8B7355]">
                            Explore Without Limits
                        </span>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[#212a3b]">
                        Discover World Books
                    </h2>
                    <p className="text-sm text-[#3d485e] mt-1">
                        All books are pre-loaded and ready for instant voice conversation. Click any book to start speaking immediately!
                    </p>
                </div>

                {/* View Switcher Tabs */}
                <div className="flex items-center p-1 bg-white border border-[#8B7355]/20 rounded-2xl shadow-sm">
                    <button
                        onClick={() => setActiveTab('curated')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activeTab === 'curated'
                                ? 'bg-[#212a3b] text-white shadow-sm'
                                : 'text-[#3d485e] hover:text-[#212a3b] hover:bg-[#f8f4e9]'
                        }`}
                    >
                        <Compass className="size-3.5" />
                        <span>Curated Bestsellers (20)</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('global')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activeTab === 'global'
                                ? 'bg-[#212a3b] text-white shadow-sm'
                                : 'text-[#3d485e] hover:text-[#212a3b] hover:bg-[#f8f4e9]'
                        }`}
                    >
                        <Globe2 className="size-3.5" />
                        <span>Search 30M+ Books</span>
                    </button>
                </div>
            </div>

            {/* TAB 1: CURATED BESTSELLERS */}
            {activeTab === 'curated' && (
                <div>
                    {/* Search & Filter Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        {/* Category Filter Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                            {CATEGORIES.map((category) => {
                                const isSelected = selectedCategory === category;
                                return (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                                            isSelected
                                                ? 'bg-[#212a3b] text-white shadow-md'
                                                : 'bg-white/80 text-[#3d485e] border border-[#8B7355]/15 hover:bg-[#f3e4c7]/50'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search in Curated */}
                        <div className="relative w-full sm:w-64 shrink-0">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8B7355]/60" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Filter curated picks..."
                                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#8B7355]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#212a3b]/20 text-[#212a3b] placeholder:text-[#3d485e]/50 shadow-sm"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="size-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Curated Grid */}
                    {filteredCuratedBooks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredCuratedBooks.map((book) => {
                                const isAlreadyAdded = userBookSlugs.includes(book.slug);
                                const isCurrentProvisioning = provisioningSlug === book.slug;

                                return (
                                    <div
                                        key={book.id}
                                        className="group bg-white rounded-2xl border border-[#8B7355]/15 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                                    >
                                        <div>
                                            <div className="relative w-full h-56 bg-[#f8f4e9] rounded-xl overflow-hidden mb-4 flex items-center justify-center p-3 shadow-inner">
                                                <Image
                                                    src={book.coverURL}
                                                    alt={book.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                    className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                                                    unoptimized
                                                />
                                                <span className="absolute top-2.5 right-2.5 bg-[#212a3b]/85 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                                                    {book.category}
                                                </span>
                                            </div>

                                            <h3 className="font-serif font-bold text-lg text-[#212a3b] line-clamp-1 group-hover:text-[#8B7355] transition-colors">
                                                {book.title}
                                            </h3>
                                            <p className="text-xs text-[#3d485e] font-medium mt-0.5 mb-2">
                                                {book.author}
                                            </p>
                                            <p className="text-xs text-[#3d485e]/80 line-clamp-2 leading-relaxed">
                                                {book.description}
                                            </p>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-[#8B7355]/10 flex flex-col gap-2">
                                            <button
                                                onClick={() => handleInstantStartCurated(book)}
                                                disabled={isCurrentProvisioning}
                                                className="w-full py-2.5 px-3 bg-[#212a3b] hover:bg-[#3d485e] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                                            >
                                                {isCurrentProvisioning ? (
                                                    <>
                                                        <Loader2 className="size-3.5 animate-spin text-amber-300" />
                                                        <span>Opening Companion...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Mic className="size-3.5 text-amber-300" />
                                                        <span>Talk with AI</span>
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleOpenUploadModal(book)}
                                                className="w-full py-1 text-[11px] text-[#8B7355] hover:text-[#212a3b] hover:underline flex items-center justify-center gap-1 transition-colors cursor-pointer"
                                            >
                                                <Upload className="size-3" />
                                                <span>Upload custom PDF edition</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white/60 border border-[#8B7355]/20 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-3">
                            <BookOpen className="size-8 text-[#8B7355]/40" />
                            <p className="font-serif font-bold text-[#212a3b]">No curated matches found</p>
                            <p className="text-xs text-[#3d485e] max-w-sm">
                                Can&apos;t find &quot;{searchQuery}&quot; in our top picks? Search 30M+ titles in the global catalog!
                            </p>
                            <button
                                onClick={() => {
                                    setGlobalQuery(searchQuery);
                                    setActiveTab('global');
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#212a3b] text-white rounded-xl text-xs font-bold shadow-sm"
                            >
                                <Globe2 className="size-3.5" />
                                <span>Search 30M+ World Books for &quot;{searchQuery}&quot;</span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* TAB 2: GLOBAL SEARCH (30 MILLION+ BOOKS) */}
            {activeTab === 'global' && (
                <div>
                    {/* Big Global Search Input */}
                    <form onSubmit={handleGlobalSearch} className="mb-8">
                        <div className="relative max-w-2xl mx-auto flex items-center gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#8B7355]" />
                                <input
                                    type="text"
                                    value={globalQuery}
                                    onChange={(e) => setGlobalQuery(e.target.value)}
                                    placeholder="Search by title, author, or topic (e.g. Dune, Steve Jobs, Shoe Dog, Ray Dalio)..."
                                    className="w-full pl-12 pr-4 py-3.5 text-sm bg-white border-2 border-[#8B7355]/30 focus:border-[#212a3b] rounded-2xl focus:outline-none text-[#212a3b] placeholder:text-[#3d485e]/50 shadow-md"
                                />
                                {globalQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setGlobalQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="size-4" />
                                    </button>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isSearchingGlobal || !globalQuery.trim()}
                                className="px-6 py-3.5 bg-[#212a3b] hover:bg-[#3d485e] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                            >
                                {isSearchingGlobal ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        <span>Searching...</span>
                                    </>
                                ) : (
                                    <>
                                        <Globe2 className="size-4 text-amber-300" />
                                        <span>Search World</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Global Search Results */}
                    {isSearchingGlobal ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-3 text-center">
                            <Loader2 className="size-8 animate-spin text-[#8B7355]" />
                            <p className="font-serif font-bold text-lg text-[#212a3b]">
                                Searching millions of books worldwide...
                            </p>
                            <p className="text-xs text-[#3d485e]">
                                Finding covers, authors, and metadata on Open Library
                            </p>
                        </div>
                    ) : globalResults.length > 0 ? (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-xs font-semibold text-[#3d485e]">
                                    Found <span className="text-[#212a3b] font-bold">{globalResults.length}</span> matching books
                                </p>
                                <span className="text-[11px] text-[#8B7355] bg-[#fff6e5] px-2.5 py-1 rounded-lg border border-[#8B7355]/20">
                                    Click any book to talk with AI immediately
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {globalResults.map((book) => {
                                    const isAlreadyAdded = userBookSlugs.includes(book.slug);
                                    const isCurrentProvisioning = provisioningSlug === book.slug;

                                    return (
                                        <div
                                            key={book.id}
                                            className="group bg-white rounded-2xl border border-[#8B7355]/15 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                                        >
                                            <div>
                                                <div className="relative w-full h-56 bg-[#f8f4e9] rounded-xl overflow-hidden mb-4 flex items-center justify-center p-3 shadow-inner">
                                                    <Image
                                                        src={book.coverURL}
                                                        alt={book.title}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                        className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                                                        unoptimized
                                                    />
                                                    {book.firstPublishYear && (
                                                        <span className="absolute top-2.5 right-2.5 bg-[#212a3b]/85 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                                                            <Calendar className="size-2.5" />
                                                            {book.firstPublishYear}
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="font-serif font-bold text-lg text-[#212a3b] line-clamp-1 group-hover:text-[#8B7355] transition-colors">
                                                    {book.title}
                                                </h3>
                                                <p className="text-xs text-[#3d485e] font-medium mt-0.5 mb-2">
                                                    {book.author}
                                                </p>
                                                {book.subjects && book.subjects.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mb-2">
                                                        {book.subjects.slice(0, 2).map((s, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="text-[9px] bg-[#f8f4e9] text-[#8B7355] px-1.5 py-0.5 rounded border border-[#8B7355]/15 line-clamp-1"
                                                            >
                                                                {s}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                {book.description && (
                                                    <p className="text-xs text-[#3d485e]/80 line-clamp-2 leading-relaxed">
                                                        {book.description}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mt-4 pt-3 border-t border-[#8B7355]/10 flex flex-col gap-2">
                                                <button
                                                    onClick={() => handleInstantStartGlobal(book)}
                                                    disabled={isCurrentProvisioning}
                                                    className="w-full py-2.5 px-3 bg-[#212a3b] hover:bg-[#3d485e] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                                                >
                                                    {isCurrentProvisioning ? (
                                                        <>
                                                            <Loader2 className="size-3.5 animate-spin text-amber-300" />
                                                            <span>Preparing AI Companion...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Mic className="size-3.5 text-amber-300" />
                                                            <span>Start Voice Chat</span>
                                                        </>
                                                    )}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleOpenUploadModal(book)}
                                                    className="w-full py-1 text-[11px] text-[#8B7355] hover:text-[#212a3b] hover:underline flex items-center justify-center gap-1 transition-colors cursor-pointer"
                                                >
                                                    <Upload className="size-3" />
                                                    <span>Upload custom PDF edition</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : hasSearchedGlobal ? (
                        <div className="bg-white/60 border border-[#8B7355]/20 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-2">
                            <BookOpen className="size-8 text-[#8B7355]/40" />
                            <p className="font-serif font-bold text-[#212a3b]">No results found for &quot;{globalQuery}&quot;</p>
                            <p className="text-xs text-[#3d485e]">
                                Check the spelling or try searching for another author or title.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-[#fff6e5] border-2 border-dashed border-[#8B7355]/25 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-3">
                            <div className="w-14 h-14 rounded-2xl bg-[#f3e4c7] flex items-center justify-center text-[#8B7355] text-2xl">
                                <Globe2 className="size-7" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[#212a3b]">
                                Search 30+ Million Books Worldwide
                            </h3>
                            <p className="text-sm text-[#3d485e] max-w-md">
                                Type any book title, author, or subject above. You can instantly talk with any book ever published without uploading a PDF!
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Custom PDF Upload Modal */}
            {activeBookForUpload && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
                    <div
                        className="bg-[#f8f4e9] border border-[#8B7355]/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleCloseUploadModal}
                            disabled={isUploading}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 border border-gray-200 shadow-sm transition-all disabled:opacity-50"
                        >
                            <X className="size-4" />
                        </button>

                        <div className="flex gap-4 items-start mb-6 pb-6 border-b border-[#8B7355]/15">
                            <div className="relative w-20 h-28 bg-white rounded-lg overflow-hidden shrink-0 shadow-md border border-[#8B7355]/20">
                                <Image
                                    src={activeBookForUpload.coverURL}
                                    alt={activeBookForUpload.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <div className="flex-1 pr-6">
                                <span className="inline-block bg-[#212a3b]/10 text-[#212a3b] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-1">
                                    Custom PDF Upload
                                </span>
                                <h3 className="text-xl font-serif font-bold text-[#212a3b]">
                                    {activeBookForUpload.title}
                                </h3>
                                <p className="text-xs text-[#3d485e] font-medium">
                                    By {activeBookForUpload.author}
                                </p>
                                <p className="text-xs text-[#3d485e]/80 mt-2">
                                    Upload your specific PDF edition to index its exact pages and text.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#212a3b] mb-1.5">
                                    1. Attach Custom PDF
                                </label>
                                <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    onClick={() => !isUploading && fileInputRef.current?.click()}
                                    className={`cursor-pointer border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
                                        pdfFile
                                            ? 'bg-emerald-50/70 border-emerald-400'
                                            : 'bg-white/80 border-[#8B7355]/30 hover:border-[#212a3b] hover:bg-white'
                                    }`}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) handleFileSelected(e.target.files[0]);
                                        }}
                                        disabled={isUploading}
                                    />

                                    {pdfFile ? (
                                        <div className="flex items-center justify-between px-2">
                                            <div className="flex items-center gap-3 text-left">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                                                    <FileText className="size-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-[#212a3b] line-clamp-1">
                                                        {pdfFile.name}
                                                    </p>
                                                    <p className="text-[11px] text-[#3d485e]">
                                                        {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPdfFile(null);
                                                }}
                                                disabled={isUploading}
                                                className="text-gray-400 hover:text-red-500 p-1"
                                            >
                                                <X className="size-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-1.5 py-1">
                                            <Upload className="size-6 text-[#8B7355]" />
                                            <p className="text-xs font-semibold text-[#212a3b]">
                                                Click to upload or drag & drop PDF
                                            </p>
                                            <p className="text-[11px] text-[#3d485e]">
                                                PDF up to 50MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#212a3b] mb-1.5">
                                    2. Choose Companion Voice Persona
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {Object.entries(voiceOptions).map(([key, voice]) => {
                                        const isVoiceSelected = selectedVoice === key;
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setSelectedVoice(key)}
                                                disabled={isUploading}
                                                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                                                    isVoiceSelected
                                                        ? 'bg-[#212a3b] text-white border-[#212a3b] shadow-sm'
                                                        : 'bg-white text-[#3d485e] border-[#8B7355]/20 hover:bg-[#f3e4c7]/40'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between w-full mb-1">
                                                    <span className="font-bold text-xs">{voice.name}</span>
                                                    <Volume2
                                                        className={`size-3 ${
                                                            isVoiceSelected ? 'text-amber-300' : 'text-gray-400'
                                                        }`}
                                                    />
                                                </div>
                                                <p
                                                    className={`text-[10px] leading-tight line-clamp-1 ${
                                                        isVoiceSelected ? 'text-gray-300' : 'text-[#3d485e]/70'
                                                    }`}
                                                >
                                                    {voice.description.split(',')[1] || voice.description}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {isUploading && (
                                <div className="bg-[#212a3b]/5 border border-[#212a3b]/15 rounded-xl p-3 flex items-center gap-3">
                                    <Loader2 className="size-4 animate-spin text-[#212a3b]" />
                                    <span className="text-xs font-medium text-[#212a3b]">
                                        {uploadStep || 'Processing custom PDF...'}
                                    </span>
                                </div>
                            )}

                            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleCustomPdfUpload}
                                    disabled={!pdfFile || isUploading}
                                    className="w-full py-3 px-5 bg-[#212a3b] hover:bg-[#3d485e] disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            <span>Processing PDF...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="size-4" />
                                            <span>Upload & Start AI</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCloseUploadModal}
                                    disabled={isUploading}
                                    className="w-full sm:w-auto py-3 px-4 rounded-xl text-xs font-medium text-[#3d485e] hover:bg-[#212a3b]/5 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
