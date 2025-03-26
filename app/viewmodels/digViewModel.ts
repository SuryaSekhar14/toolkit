import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supportedRecordTypes } from "@/config";
import { DigModel, DigResultData } from "../models/DigModel";

export const DigViewModel = () => {
  const [model] = useState<DigModel>(new DigModel());
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState("");
  const [activeTab, setActiveTab] = useState(supportedRecordTypes[0]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchRecords = async (domainToFetch: string) => {
    setLoading(true);
    try {
      router.push(`/dig?domain=${domainToFetch}`);
      const response = await fetch(`/api/dig?domain=${domainToFetch}`);
      if (!response.ok) {
        throw new Error("Failed to fetch DNS records");
      }
      const data: DigResultData = await response.json();
      model.setData(data);
    } catch (error) {
      console.error("Error fetching DNS records:", error);
      model.setData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    const domainParam = searchParams.get("domain");
    if (domainParam) {
      setDomain(domainParam);
      fetchRecords(domainParam);
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
    loading,
    result: model.getData(),
    activeTab,
    fetchRecords,
    handleDomainChange,
    handleTabChange,
    hasResults,
  };
}; 