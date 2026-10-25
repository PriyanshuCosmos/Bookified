import UploadForm from "@/components/UploadForm";

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{ title?: string; author?: string; cover?: string; persona?: string }>;
}) => {
    const { title, author, cover, persona } = await searchParams;

    return (
        <main className="new-book">
            <section className="flex flex-col gap-3 text-center mb-4">
                <h1 className="page-title-xl">
                    {title ? `Add "${title}" to Library` : 'Add a New Book'}
                </h1>
                <p className="subtitle">
                    {title
                        ? `Upload the PDF to index the content and talk with your AI companion`
                        : 'Upload a PDF to generate your interactive reading experience'}
                </p>
            </section>

            <UploadForm prefilled={{ title, author, coverURL: cover, persona }} />
        </main>
    );
};

export default Page
