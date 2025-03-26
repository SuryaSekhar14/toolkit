"use client";

import React from "react";
import { PyPiStatsViewModel } from "@/app/viewmodels/PyPiStatsViewModel";
import { copyToClipboard } from "@/app/utils/copyToClipboard";

const PyPiStatsPage = () => {
  const {
    packageName,
    setPackageName,
    packageInfo,
    loading,
    fetchPackageInfo,
    notFound,
  } = PyPiStatsViewModel();

  return (
    <>
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
        {notFound && (
          <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded shadow-md w-full max-w-md">
            <p className="text-red-500">Package not found</p>
          </div>
        )}
        {packageInfo && (
          <div className="mt-8 grid grid-cols-1 gap-4 w-full max-w-md">
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
              <div className="flex justify-between items-center pl-4 pr-4">
                <h2 className="text-lg font-bold">Download Statistics</h2>
                <button
                  onClick={() =>
                    copyToClipboard(JSON.stringify(packageInfo, null, 2))
                  }
                  className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                >
                  Copy
                </button>
              </div>
              <div className="mt-2">
                {Object.entries(packageInfo).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 border border-gray-300 rounded-lg mb-4 shadow hover:shadow-lg transition-shadow duration-200"
                  >
                    <strong className="text-gray-200">
                      {key.replace(/([A-Z])/g, " $1")}:{" "}
                    </strong>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PyPiStatsPage;
