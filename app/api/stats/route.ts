export async function GET(request: Request) {
    const url = new URL(request.url);
    const searchPackage = url.searchParams.get('package');

    if (!searchPackage) {
        return Response.json({ message: 'Hello from the stats route!' });
    }

    try {
        const url = `https://pypistats.org/api/packages/${searchPackage}/overall`;

        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        const downloadsData = data.data || [];
        const totalDownloads = downloadsData.reduce((sum: number, item: any) => sum + (item.downloads || 0), 0);

        return Response.json({ totalDownloads: totalDownloads });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return Response.json({ totalDownloads: 0, message: errorMessage }, { status: 500 });
    }
};
