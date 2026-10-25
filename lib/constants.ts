// Brand color - used in JS files where CSS variables aren't available
export const BRAND_COLOR = '#212a3b'; // Dark blue-gray
export const BRAND_COLOR_HOVER = '#3d485e'; // Medium blue-gray

// Curated World Books Catalog with categories and Open Library covers
export interface CuratedBook {
    id: string;
    title: string;
    author: string;
    slug: string;
    coverURL: string;
    coverColor?: string;
    category: 'Self-Growth' | 'Finance' | 'Technology' | 'Psychology' | 'Classics' | 'Philosophy';
    description: string;
    isbn: string;
}

export const curatedWorldBooks: CuratedBook[] = [
    {
        id: '1',
        title: 'Atomic Habits',
        author: 'James Clear',
        slug: 'atomic-habits',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
        category: 'Self-Growth',
        description: 'An easy and proven way to build good habits and break bad ones using 1% daily improvements.',
        isbn: '9780735211292',
        coverColor: '#f8f4e9',
    },
    {
        id: '2',
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        slug: 'the-psychology-of-money',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg',
        category: 'Finance',
        description: 'Timeless lessons on wealth, greed, and happiness exploring how human behavior drives financial success.',
        isbn: '9780857197689',
        coverColor: '#f8f4e9',
    },
    {
        id: '3',
        title: 'Clean Code',
        author: 'Robert Cecil Martin',
        slug: 'clean-code',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
        category: 'Technology',
        description: 'A handbook of agile software craftsmanship for writing readable, maintainable, and elegant code.',
        isbn: '9780132350884',
        coverColor: '#f8f4e9',
    },
    {
        id: '4',
        title: 'Deep Work',
        author: 'Cal Newport',
        slug: 'deep-work',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg',
        category: 'Self-Growth',
        description: 'Rules for focused success in a distracted world, teaching you how to master difficult tasks quickly.',
        isbn: '9781455586691',
        coverColor: '#f8f4e9',
    },
    {
        id: '5',
        title: '1984',
        author: 'George Orwell',
        slug: '1984',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
        category: 'Classics',
        description: 'The iconic dystopian masterpiece on surveillance, censorship, totalitarianism, and individual freedom.',
        isbn: '9780451524935',
        coverColor: '#f8f4e9',
    },
    {
        id: '6',
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        slug: 'rich-dad-poor-dad',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg',
        category: 'Finance',
        description: 'What the rich teach their kids about money that the poor and middle class do not.',
        isbn: '9781612680194',
        coverColor: '#f8f4e9',
    },
    {
        id: '7',
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        slug: 'thinking-fast-and-slow',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780374275631-L.jpg',
        category: 'Psychology',
        description: 'Nobel laureate Daniel Kahneman explores the two systems that drive the way we think and make decisions.',
        isbn: '9780374275631',
        coverColor: '#f8f4e9',
    },
    {
        id: '8',
        title: 'The Pragmatic Programmer',
        author: 'David Thomas & Andrew Hunt',
        slug: 'the-pragmatic-programmer',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg',
        category: 'Technology',
        description: 'Essential advice, techniques, and mindsets for modern software developers seeking mastery.',
        isbn: '9780135957059',
        coverColor: '#f8f4e9',
    },
    {
        id: '9',
        title: 'The Power of Habit',
        author: 'Charles Duhigg',
        slug: 'the-power-of-habit',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9781400069286-L.jpg',
        category: 'Psychology',
        description: 'Why we do what we do in life and business, and how the habit loop can transform our routines.',
        isbn: '9781400069286',
        coverColor: '#f8f4e9',
    },
    {
        id: '10',
        title: 'How to Win Friends and Influence People',
        author: 'Dale Carnegie',
        slug: 'how-to-win-friends-and-influence-people',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780671027032-L.jpg',
        category: 'Self-Growth',
        description: 'The classic handbook on communication, human relations, persuasion, and building meaningful connections.',
        isbn: '9780671027032',
        coverColor: '#f8f4e9',
    },
    {
        id: '11',
        title: 'Brave New World',
        author: 'Aldous Huxley',
        slug: 'brave-new-world',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg',
        category: 'Classics',
        description: 'A prophetic vision of a futuristic society driven by technological conditioning and consumerism.',
        isbn: '9780060850524',
        coverColor: '#f8f4e9',
    },
    {
        id: '12',
        title: 'The Courage to Be Disliked',
        author: 'Fumitake Koga & Ichiro Kishimi',
        slug: 'the-courage-to-be-disliked',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9781501197274-L.jpg',
        category: 'Philosophy',
        description: 'A profound dialogue revealing the power of Adlerian psychology to achieve genuine happiness and freedom.',
        isbn: '9781501197274',
        coverColor: '#f8f4e9',
    },
    {
        id: '13',
        title: 'JavaScript: The Definitive Guide',
        author: 'David Flanagan',
        slug: 'javascript-the-definitive-guide',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780596805524-L.jpg',
        category: 'Technology',
        description: 'The authoritative, in-depth programmer guide to modern JavaScript, web APIs, and language internals.',
        isbn: '9780596805524',
        coverColor: '#f8f4e9',
    },
    {
        id: '14',
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        slug: 'sapiens-a-brief-history-of-humankind',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
        category: 'Philosophy',
        description: 'How an insignificant ape became the ruler of planet Earth through shared myths and collective imagination.',
        isbn: '9780062316097',
        coverColor: '#f8f4e9',
    },
    {
        id: '15',
        title: 'Zero to One',
        author: 'Peter Thiel',
        slug: 'zero-to-one',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg',
        category: 'Finance',
        description: 'Notes on startups and how to build the future by creating things that are completely new.',
        isbn: '9780804139298',
        coverColor: '#f8f4e9',
    },
    {
        id: '16',
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        slug: 'the-alchemist',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg',
        category: 'Classics',
        description: 'A magical fable about following your dreams, listening to your heart, and discovering your personal legend.',
        isbn: '9780061122415',
        coverColor: '#f8f4e9',
    },
    {
        id: '17',
        title: 'Meditations',
        author: 'Marcus Aurelius',
        slug: 'meditations',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780812968255-L.jpg',
        category: 'Philosophy',
        description: 'Private journal entries of a Roman Emperor exploring stoic philosophy, self-discipline, and inner peace.',
        isbn: '9780812968255',
        coverColor: '#f8f4e9',
    },
    {
        id: '18',
        title: "Can't Hurt Me",
        author: 'David Goggins',
        slug: 'cant-hurt-me',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9781544512280-L.jpg',
        category: 'Self-Growth',
        description: 'Master your mind and defy the odds: David Goggins inspiring journey of unrelenting mental toughness.',
        isbn: '9781544512280',
        coverColor: '#f8f4e9',
    },
    {
        id: '19',
        title: "Man's Search for Meaning",
        author: 'Viktor E. Frankl',
        slug: 'mans-search-for-meaning',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780807014295-L.jpg',
        category: 'Psychology',
        description: 'Viktor Frankl classic memoir on surviving concentration camps and discovering purpose in life.',
        isbn: '9780807014295',
        coverColor: '#f8f4e9',
    },
    {
        id: '20',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        slug: 'to-kill-a-mockingbird',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
        category: 'Classics',
        description: 'A timeless coming-of-age story confronting racism, empathy, and moral integrity in the American South.',
        isbn: '9780061120084',
        coverColor: '#f8f4e9',
    },
];

// Backwards compatibility
export const sampleBooks = curatedWorldBooks;

// File validation helpers
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ACCEPTED_PDF_TYPES = ['application/pdf'];
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Pre-configured VAPI assistant ID (hardcoded for this app)
export const ASSISTANT_ID = process.env.NEXT_PUBLIC_ASSISTANT_ID!;

// 11Labs Voice IDs - Optimized for conversational AI
// Voices selected for natural, engaging book conversations
export const voiceOptions = {
    // Male voices
    dave: { id: 'CYw3kZ02Hs0563khs1Fj', name: 'Dave', description: 'Young male, British-Essex, casual & conversational' },
    daniel: { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', description: 'Middle-aged male, British, authoritative but warm' },
    chris: { id: 'iP95p4xoKVk53GoZ742B', name: 'Chris', description: 'Male, casual & easy-going' },
    // Female voices
    rachel: { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', description: 'Young female, American, calm & clear' },
    sarah: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', description: 'Young female, American, soft & approachable' },
};

// Voice categories for the selector UI
export const voiceCategories = {
    male: ['dave', 'daniel', 'chris'],
    female: ['rachel', 'sarah'],
};

// Default voice
export const DEFAULT_VOICE = 'rachel';

// ElevenLabs voice settings optimized for conversational AI
export const VOICE_SETTINGS = {
    stability: 0.45, // Lower for more emotional, dynamic delivery (0.30-0.50 is natural)
    similarityBoost: 0.75, // Enhances clarity without distortion
    style: 0, // Keep at 0 for conversational AI (higher = more latency, less stable)
    useSpeakerBoost: true, // Improves voice quality
    speed: 1.0, // Natural conversation speed
};

// VAPI configuration for natural conversation
// NOTE: These settings should be configured in the VAPI Dashboard for the assistant
// They are kept here for reference and documentation purposes
export const VAPI_DASHBOARD_CONFIG = {
    // Turn-taking settings
    startSpeakingPlan: {
        smartEndpointingEnabled: true,
        waitSeconds: 0.4,
    },
    stopSpeakingPlan: {
        numWords: 2,
        voiceSeconds: 0.2,
        backoffSeconds: 1.0,
    },
    // Timing settings
    silenceTimeoutSeconds: 30,
    responseDelaySeconds: 0.4,
    llmRequestDelaySeconds: 0.1,
    // Conversation features
    backgroundDenoisingEnabled: true,
    backchannelingEnabled: true,
    fillerInjectionEnabled: false,
};

// Clerk appearance overrides - Warm Literary Style
// Note: Tailwind requires static class names at build time, so we hardcode color values here
export const CLERK_AUTH_APPEARANCE_OVERRIDE = {
    rootBox: 'mx-auto',
    card: 'shadow-none border-none rounded-xl bg-transparent',
    headerTitle: '!text-2xl font-bold text-[#212a3b]',
    headerSubtitle: '!mt-3 !text-sm text-[#3d485e]',
    socialButtonsBlockButton:
        '!border border-[rgba(33,42,59,0.12)] hover:bg-[#212a3b]/10 transition-all h-12 text-lg !rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08)]',
    socialButtonsBlockButtonText: 'font-medium !text-[#212a3b] !text-lg',
    formButtonPrimary:
        'bg-[#212a3b] hover:bg-[#3d485e] text-white font-medium !border-0 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08)] normal-case !h-12 !text-lg !rounded-xl',
    formFieldInput:
        '!border !border-[rgba(33,42,59,0.12)] !rounded-xl focus:ring-[#212a3b] focus:border-[#212a3b] !h-12 !min-h-12 !text-lg !bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.06)]',
    formFieldLabel: 'text-[#212a3b] font-medium text-lg',
    footerActionLink: 'text-[#212a3b] hover:text-[#3d485e] text-base font-medium',
};


