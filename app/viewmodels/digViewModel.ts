import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supportedRecordTypes } from "@/config";
import { DigModel, DigResultData } from "../models/DigModel";
import useSWR from "swr";
import { fetcher, defaultSWROptions } from "@/app/utils/swrFetcher";

export const DigViewModel = () => {
  const [model] = useState<DigModel>(new DigModel());
  const [domain, setDomain] = useState("");
  const [queryDomain, setQueryDomain] = useState("");
  const [activeTab, setActiveTab] = useState(supportedRecordTypes[0]);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Only fetch data if we have a domain to query
  const { data, error, isLoading } = useSWR<DigResultData>(
    queryDomain ? `/api/dig?domain=${queryDomain}` : null,
    fetcher,
    {
      ...defaultSWROptions,
      onSuccess: (data: DigResultData) => {
        model.setData(data);
      },
      onError: () => {
        model.setData(null);
      }
    }
  );

  // Update URL and trigger query when form is submitted
  const fetchRecords = useCallback((domainToFetch: string) => {
    if (!domainToFetch) return;
    
    // Update URL and set the query domain to trigger the SWR fetch
    router.push(`/dig?domain=${domainToFetch}`);
    setQueryDomain(domainToFetch);
  }, [router]);

  // Initialize from URL params on first load
  useEffect(() => {
    const domainParam = searchParams.get("domain");
    if (domainParam) {
      setDomain(domainParam);
      setQueryDomain(domainParam);
    }
  }, [searchParams]);

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const hasResults = (tabType: string): boolean => {
    return model.hasValidRecords(tabType);
  };

  return {
    domain,
    loading: isLoading,
    result: model.getData(),
    activeTab,
    fetchRecords,
    handleDomainChange,
    handleTabChange,
    hasResults,
  };
}; 