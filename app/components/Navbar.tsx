"use client";

import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import Image from "next/image";
import { useState } from "react";
import Sidenav from "./Sidenav";
import { HiMenuAlt2 } from "react-icons/hi";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow border-b-2 border-b-gray-500">
        <div className="flex items-center">
          <button 
            className="mr-2 block md:hidden"
            onClick={toggleMobileMenu}
          >
            <HiMenuAlt2 size={24} className="text-black dark:text-white" />
          </button>
          <Link href="/">
            <Image src="/icons/s-logo.png" alt="Logo" className="h-8 w-8 mr-2" width={32} height={32} />
          </Link>
          {/* <div className="text-xl font-bold text-black dark:text-white">
            <Link href="/">Surya's Toolkit</Link>
          </div> */}
        </div>
        <DarkModeToggle />
      </nav>

      {/* Mobile sidenav */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleMobileMenu}
          ></div>
          
          {/* Side menu */}
          <div className="fixed inset-y-0 left-0 z-50 w-64">
            <Sidenav />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
