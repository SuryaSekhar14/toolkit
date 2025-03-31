"use client";

import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";


const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  if (theme == undefined) {
    console.log("theme is undefined");
  } else {
    console.log("theme is defined");
  }

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

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
