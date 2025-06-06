import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PyPiStatsModel } from "@/app/models/PyPiStatsModel";

export const PyPiStatsViewModel = () => {
  const [packageName, setPackageName] = useState<string>("");
  const [packageInfo, setPackageInfo] = useState<PyPiStatsModel | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchPackageInfo = async (packageToFetch?: string) => {
    const pkgName = packageToFetch || packageName;
    if (!pkgName) return;

    router.push(`/pypi-stats?package=${encodeURIComponent(pkgName)}`);
    setLoading(true);
    try {
      const response = await fetch(`/api/stats?package=${encodeURIComponent(pkgName)}`);
      if (!response.ok) {
        setPackageInfo(null);
        setNotFound(true);
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      setNotFound(false);
      setPackageInfo(new PyPiStatsModel(
        data.lastDayDownloads,
        data.lastWeekDownloads,
        data.lastMonthDownloads,
        data.lastSixMonthsDownloads,
        data.lastYearDownloads,
        data.totalDownloads
      ));
    } catch (error) {
      console.error("Error fetching package info:", error);
      setPackageInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const packageParam = searchParams.get("package");
    if (packageParam) {
      setPackageName(packageParam);
      fetchPackageInfo(packageParam);
    }
  }, [searchParams, fetchPackageInfo]);

  return {
    packageName,
    setPackageName,
    packageInfo,
    loading,
    fetchPackageInfo,
    notFound,
  };
}; 