"use client";

import React from "react";
import Head from "next/head";
import { PyPiStatsViewModel } from "@/app/viewmodels/PyPiStatsViewModel";

const PyPiStatsPage = () => {
  const {
    packageName,
    setPackageName,
    packageInfo,
    loading,
    fetchPackageInfo,
  } = PyPiStatsViewModel();

  return (
    <>
      <Head>
        <title>PyPi Stats</title>
        <meta
          name="description"
          content="Get PyPi package total download stats for any package."
        />
        <meta name="keywords" content="pypi total downloads stats" />
        <meta property="og:title" content="PyPi Stats" />
        <meta
          property="og:description"
          content="Get PyPi package total download stats."
        />
        <meta
          property="og:url"
          content="https://toolkit.surya.dev/pypi-stats"
        />
        <meta
          property="og:image"
          content="https://toolkit.surya.dev/favicon.ico"
        />
        <link rel="canonical" href="https://toolkit.surya.dev/pypi-stats" />
      </Head>
      <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 p-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">
          PyPi Package Stats
        </h1>
        <div className="w-full max-w-md">
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            placeholder="Enter package name"
            className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
          />
          <button
            onClick={fetchPackageInfo}
            className="w-full p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Get Total Download Info"}
          </button>
        </div>
        {packageInfo && (
          <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded shadow-md w-full max-w-md">
            <pre className="whitespace-pre-wrap text-black dark:text-white">
              {JSON.stringify(packageInfo, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </>
  );
};

export default PyPiStatsPage; 