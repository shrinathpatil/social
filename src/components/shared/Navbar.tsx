import { UserButton } from "@clerk/nextjs";
import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full flex wrapper items-center justify-between bg-white h-[80px] z-[10]">
      <Link href="/" className="flex items-center gap-x-6 cursor-pointer">
        <Image
          src="/assets/icons/Logomark.svg"
          alt="logo"
          width={50}
          height={50}
        />
        <p className="text-black text-2xl font-bold">Social</p>
      </Link>
      <SearchBar />
      <div className="max-sm:hidden">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
      <Link href="/messages" className="sm:hidden">
        <Send size={28} className="icon" />
      </Link>
    </nav>
  );
};

export default Navbar;
