import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
      <div className="text-xl font-bold text-black dark:text-white">
        <Link href="/">Surya's Toolkit</Link>
      </div>
      <DarkModeToggle />
    </nav>
  );
};

export default Navbar;
