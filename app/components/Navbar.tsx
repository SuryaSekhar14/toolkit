import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center">
        <Link href="/">
          <img src="/icons/s-logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        </Link>
        {/* <div className="text-xl font-bold text-black dark:text-white">
          <Link href="/">Surya's Toolkit</Link>
        </div> */}
      </div>
      <DarkModeToggle />
    </nav>
  );
};

export default Navbar;
