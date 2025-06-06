"use client";

import React, { useEffect, useState } from "react";
import { PyPiStatsViewModel } from "@/app/viewmodels/PyPiStatsViewModel";
import { copyToClipboard } from "@/app/utils/copyToClipboard";
import { useTheme } from "next-themes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Scale,
  ScriptableScaleContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PyPiStatsPage = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // After mounted on client, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Handle the case when the theme is already set in local storage
  const isDarkMode = mounted ? (theme === "dark" || resolvedTheme === "dark") : true;
  
  const {
    packageName,
    setPackageName,
    packageInfo,
    loading,
    fetchPackageInfo,
    notFound,
  } = PyPiStatsViewModel();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchPackageInfo();
    }
  };

  const getTrendChartData = () => {
    if (!packageInfo) return {
      labels: [],
      datasets: [{
        label: 'Total Downloads',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: true,
      }]
    };
    
    return {
      labels: ['Last Day', 'Last Week', 'Last Month', 'Last 6 Months', 'Last Year'],
      datasets: [
        {
          label: 'Total Downloads',
          data: [
            packageInfo.lastDayDownloads,
            packageInfo.lastWeekDownloads,
            packageInfo.lastMonthDownloads,
            packageInfo.lastSixMonthsDownloads,
            packageInfo.lastYearDownloads,
          ],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
          fill: true,
        },
      ],
    };
  };

  const getMonthlyDownloadsData = () => {
    if (!packageInfo) return {
      labels: [],
      datasets: [{
        label: 'Downloads per Month (Estimated)',
        data: [],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
        fill: true,
      }]
    };
    
    // Calculate approximate monthly downloads
    const monthlyData = [
      packageInfo.lastMonthDownloads,
      Math.round((packageInfo.lastSixMonthsDownloads - packageInfo.lastMonthDownloads) / 5),
      Math.round((packageInfo.lastYearDownloads - packageInfo.lastSixMonthsDownloads) / 6),
    ];
    
    // Get last 12 month labels
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push(date.toLocaleString('default', { month: 'short' }));
    }
    
    return {
      labels: months,
      datasets: [
        {
          label: 'Downloads per Month (Estimated)',
          data: Array(12).fill(Math.round(monthlyData[2])).map((val, i) => {
            if (i >= 11) return monthlyData[0];
            if (i >= 6) return monthlyData[1];
            return val;
          }),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.3,
          fill: true,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDarkMode ? 'white' : '#333',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: `Download Statistics for ${packageName || 'Package'}`,
        color: isDarkMode ? 'white' : '#333',
        font: {
          size: 16,
          weight: "bold" as const
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { 
          color: isDarkMode ? 'white' : '#333',
          callback: function(this: Scale, tickValue: number) {
            if (tickValue >= 1000000) return (tickValue / 1000000).toFixed(1) + 'M';
            if (tickValue >= 1000) return (tickValue / 1000).toFixed(1) + 'K';
            return tickValue;
          }
        },
        grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
      },
      x: {
        ticks: { color: isDarkMode ? 'white' : '#333' },
        grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
      },
    },
  } as ChartOptions<'line'>;

  // Create copies with specific titles for the different charts
  const trendChartOptions = {
    ...chartOptions,
    plugins: {
      ...(chartOptions.plugins || {}),
      title: {
        ...(chartOptions.plugins?.title || {}),
        text: 'Download Growth'
      }
    }
  } as ChartOptions<'line'>;

  const monthlyChartOptions = {
    ...chartOptions,
    plugins: {
      ...(chartOptions.plugins || {}),
      title: {
        ...(chartOptions.plugins?.title || {}),
        text: 'Downloads per Month'
      }
    }
  } as ChartOptions<'line'>;

  return (
    <>
      <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 p-4 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">
          PyPi Package Stats
        </h1>
        <div className="w-full max-w-md">
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter package name"
            className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
          />
          <button
            onClick={() => fetchPackageInfo()}
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
          <div className="mt-8 grid grid-cols-1 gap-8 w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Total Downloads</h2>
                <div className="text-4xl font-bold text-blue-500 mb-6">
                  {packageInfo.totalDownloads.toLocaleString()}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-300">Last 24 Hours</div>
                    <div className="text-xl font-semibold text-gray-800 dark:text-white">
                      {packageInfo.lastDayDownloads.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-300">Last Week</div>
                    <div className="text-xl font-semibold text-gray-800 dark:text-white">
                      {packageInfo.lastWeekDownloads.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-300">Last Month</div>
                    <div className="text-xl font-semibold text-gray-800 dark:text-white">
                      {packageInfo.lastMonthDownloads.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-300">Last Year</div>
                    <div className="text-xl font-semibold text-gray-800 dark:text-white">
                      {packageInfo.lastYearDownloads.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Download Trends</h2>
                <div className="h-[300px]">
                  {getTrendChartData() && <Line data={getTrendChartData()} options={trendChartOptions} />}
                </div>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Monthly Download Estimates</h2>
              <div className="h-[300px]">
                {getMonthlyDownloadsData() && <Line data={getMonthlyDownloadsData()} options={monthlyChartOptions} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PyPiStatsPage; 