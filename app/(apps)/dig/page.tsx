"use client";

import React, { Suspense } from "react";
import { supportedRecordTypes } from "@/config";
import { DigViewModel } from "@/app/viewmodels/digViewModel";

const DigPageContent = () => {
  const {
    domain,
    loading,
    result,
    activeTab,
    fetchRecords,
    handleDomainChange,
    handleTabChange,
    hasResults,
  } = DigViewModel();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg w-full">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          Dig - Fetch DNS Records Online
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
          Fetch DNS records for a domain using your browser.
        </p>
        <input
          type="text"
          placeholder="Enter domain name"
          value={domain}
          onChange={handleDomainChange}
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
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
                  onClick={() => handleTabChange(type)}
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
              {!hasResults(activeTab) ? (
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
