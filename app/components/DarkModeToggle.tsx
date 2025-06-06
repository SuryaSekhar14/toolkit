"use client";

import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  // Use a mounting state to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  // Handle the case when the theme is already set in local storage or not yet resolved
  const isDarkMode = mounted && theme ? theme === "dark" : true;

  // After mounted on client, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  // If not mounted yet, show a skeleton to avoid layout shift
  if (!mounted) {
    return (
      <div className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full relative">
        <div className="absolute top-1 left-[2px] h-6 w-6 bg-white rounded-full"></div>
      </div>
    );
  }

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={toggleDarkMode}
        className="sr-only peer"
      />
      <div className="w-16 h-8 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
        <MdOutlineLightMode
          className={`absolute right-2 top-1.5 w-5 h-5 text-yellow-800 z-10 ${
            isDarkMode ? "hidden" : "block"
          }`}
        />
        <MdOutlineDarkMode
          className={`absolute left-2 top-1.5 w-5 h-5 text-gray-900 z-10 ${
            isDarkMode ? "block" : "hidden"
          }`}
        />
      </div>
    </label>
  );
};

export default DarkModeToggle;
