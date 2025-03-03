interface PyPiReturnType {
  type: string;
  package: string;
  data: Array<{
    category: string;
    date: string;
    downloads: number;
  }>
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchPackage = url.searchParams.get("package");

  if (!searchPackage) {
    return Response.json({ message: "Hello from the stats route!" });
  }

  try {
    const url = `https://pypistats.org/api/packages/${searchPackage}/overall`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: PyPiReturnType = await response.json();
    const downloadsData = data.data || [];

    const lastDayDownloads = downloadsData[downloadsData.length - 1]?.downloads;
    const lastWeekDownloads = downloadsData
      .slice(-7)
      .reduce((sum: number, item: any) => sum + (item.downloads || 0), 0);
    const lastMonthDownloads = downloadsData
      .slice(-30)
      .reduce((sum: number, item: any) => sum + (item.downloads || 0), 0);
    const lastSixMonthsDownloads = downloadsData
      .slice(-180)
      .reduce((sum: number, item: any) => sum + (item.downloads || 0), 0);
    const lastYearDownloads = downloadsData
      .slice(-365)
      .reduce((sum: number, item: any) => sum + (item.downloads || 0), 0);
    const totalDownloads = downloadsData.reduce(
      (sum: number, item: any) => sum + (item.downloads || 0),
      0
    );

    return Response.json({
      lastDayDownloads,
      lastWeekDownloads,
      lastMonthDownloads,
      lastSixMonthsDownloads,
      lastYearDownloads,
      totalDownloads,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return Response.json(
      { totalDownloads: 0, message: errorMessage },
      { status: 500 }
    );
  }
}
