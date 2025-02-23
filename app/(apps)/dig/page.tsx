"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const supportedRecordTypes = [
  "A",
  "AAAA",
  "ANY",
  "CAA",
  "CNAME",
  "DNSKEY",
  "DS",
  "MX",
  "NS",
  "PTR",
  "TXT",
  "SOA",
  "SPF",
  "SRV",
  "TLSA",
  "TSIG",
];

export const metadata = {
  title: "DNS Dig - Online",
  description:
    "Fetch DNS records for a domain. Supported record types: A, AAAA, ANY, CAA, CNAME, DNSKEY, DS, MX, NS, PTR, TXT, SOA, SPF, SRV, TLSA, TSIG.",
  keywords: ["dig", "online", "dns dig", "dns records", "dns lookup", "dns", "tools", "surya", "surya's toolkit"],
  openGraph: {
    title: "DNS Dig - Online",
    description: "Fetch DNS records for a domain. Supported record types: A, AAAA, ANY, CAA, CNAME, DNSKEY, DS, MX, NS, PTR, TXT, SOA, SPF, SRV, TLSA, TSIG.",
    url: "https://toolkit.surya.dev/dig",
    // images: [{ url: "https://yourapp.com/images/miniapp1.jpg" }],
  },
  alternates: {
    canonical: "https://toolkit.surya.dev/dig",
  },
};

interface DigResult {
  results: {
    [key: string]: any;
  };
}

const DigPageContent = () => {
  const [result, setResult] = useState<DigResult | null>(null);
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
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching DNS records:", error);
      setResult(null);
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

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg w-full">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          Dig Online
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
          Fetch DNS records for a domain using your browser.
        </p>
        <input
          type="text"
          placeholder="Enter domain name"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
        />
        <button
          onClick={() => fetchRecords(domain)}
          className="w-full p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200"
        >
          {loading ? "Fetching..." : "Fetch Records"}
        </button>
        {result && (
          <div className="mt-6">
            <div className="flex space-x-2 mb-4 items-center justify-center">
              {supportedRecordTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`p-2 rounded ${
                    activeTab === type
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
              {JSON.stringify(result.results[activeTab], null, 2).includes(
                "Error:"
              ) ? (
                <p className="text-red-500">No results found!</p>
              ) : (
                <pre className="text-gray-800 dark:text-white whitespace-pre-wrap break-words">
                  {JSON.stringify(result.results[activeTab], null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DigPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <DigPageContent />
  </Suspense>
);

export default DigPage;
