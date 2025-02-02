"use client";

import React, { useState } from "react";
import { FaHeart, FaShare } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Toast from "./Toast"; // Import the Toast component

interface AppCardProps {
  icon?: React.ReactNode | string;
  title: string;
  description: string | React.ReactNode;
  link: string;
}

const AppCard: React.FC<AppCardProps> = ({
  icon,
  title,
  description,
  link,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderIcon = () => {
    if (typeof icon === "string") {
      return (
        <Image
          src={icon}
          alt="icon"
          className="mr-2 w-6 h-6"
          width={24}
          height={24}
        />
      );
    }
    return icon;
  };

  const emitHearts = (e: React.MouseEvent) => {
    const heart = document.createElement("div");
    heart.className = "fixed w-5 h-5 animate-heartAnimation";
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    heart.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="20px" height="20px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
    document.body.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 1000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin + link);
    setShowToast(true);
  };

  return (
    <div className="w-full rounded overflow-hidden shadow-lg p-2 bg-white dark:bg-gray-800 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
      <Link href={link} className="flex flex-grow">
        <div className="p-4 flex-grow">
          <div className="flex items-center mb-2">
            {icon && <div className="mr-2">{renderIcon()}</div>}
            <div className="font-bold text-xl text-black dark:text-white">
              {title}
            </div>
          </div>
          <p className="text-black dark:text-white text-base mt-4">
            {description}
          </p>
        </div>
      </Link>
      <div className="flex justify-end gap-2 p-2">
        <button
          className="text-gray-600 dark:text-gray-400"
          onClick={emitHearts}
        >
          <FaHeart />
        </button>
        <button className="text-gray-600 dark:text-gray-400" onClick={copyLink}>
          <FaShare />
        </button>
      </div>
      {showToast && (
        <Toast message="Link copied to clipboard!" duration={1000} />
      )}
    </div>
  );
};

export default AppCard;
