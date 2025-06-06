import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PyPiStatsModel } from "@/app/models/PyPiStatsModel";
import useSWR from "swr";
import { fetcher, defaultSWROptions } from "@/app/utils/swrFetcher";

// Define the expected API response type
interface PyPiStatsResponse {
  lastDayDownloads: number;
  lastWeekDownloads: number;
  lastMonthDownloads: number;
  lastSixMonthsDownloads: number;
  lastYearDownloads: number;
  totalDownloads: number;
}

export const PyPiStatsViewModel = () => {
  const [packageName, setPackageName] = useState<string>("");
  const [queryPackage, setQueryPackage] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Only fetch data if we have a package name to query
  const { data, error, isLoading } = useSWR<PyPiStatsResponse>(
    queryPackage ? `/api/stats?package=${encodeURIComponent(queryPackage)}` : null,
    fetcher,
    defaultSWROptions
  );
  
  // Transform the API response to our model
  const packageInfo = data ? new PyPiStatsModel(
    data.lastDayDownloads,
    data.lastWeekDownloads,
    data.lastMonthDownloads,
    data.lastSixMonthsDownloads,
    data.lastYearDownloads,
    data.totalDownloads
  ) : null;

  // Update URL and trigger query when form is submitted
  const fetchPackageInfo = useCallback((packageToFetch?: string) => {
    const pkgName = packageToFetch || packageName;
    if (!pkgName) return;
    
    // Update URL and set the query package to trigger the SWR fetch
    router.push(`/pypi-stats?package=${encodeURIComponent(pkgName)}`);
    setQueryPackage(pkgName);
  }, [packageName, router]);

  // Initialize from URL params on first load
  useEffect(() => {
    const packageParam = searchParams.get("package");
    if (packageParam) {
      setPackageName(packageParam);
      setQueryPackage(packageParam);
    }
  }, [searchParams]);

  return {
    packageName,
    setPackageName,
    packageInfo,
    loading: isLoading,
    fetchPackageInfo,
    notFound: !!error,
  };
}; 