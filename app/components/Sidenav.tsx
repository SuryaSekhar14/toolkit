"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  MdOutlineDns, 
  MdOutlineQrCodeScanner 
} from "react-icons/md";
import { 
  BsReverseLayoutTextWindowReverse, 
  BsFiletypePdf 
} from "react-icons/bs";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { SiPypi } from "react-icons/si";

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: null
  },
  {
    name: "PyPi Stats",
    path: "/pypi-stats",
    icon: <SiPypi size={20} />
  },
  {
    name: "DNS Lookup",
    path: "/dig",
    icon: <MdOutlineDns size={20} />
  },
  {
    name: "Image to PDF",
    path: "/image-to-pdf",
    icon: <BsFiletypePdf size={20} />
  },
  {
    name: "Text Editor",
    path: "/text-editor",
    icon: <BsReverseLayoutTextWindowReverse size={20} />
  },
  {
    name: "QR Code Generator",
    path: "/qr-code",
    icon: <MdOutlineQrCodeScanner size={20} />
  }
];

export default function Sidenav() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-white dark:bg-gray-800 shadow-md">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Toolkit</h2>
      </div>
      <nav className="p-2">
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path} className="mb-1">
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
} 