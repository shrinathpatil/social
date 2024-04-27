import { getUser } from "@/actions/user.action";
import { getSession } from "@/hooks/getSession";
import { LogOut, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogOutButton from "./LogOutButton";
import SearchBar from "./SearchBar";

const Navbar = async () => {
  const { userId } = getSession();
  const user = await getUser(userId);
  return (
    <nav className="sticky shadow-lg top-0 left-0 w-full flex wrapper items-center justify-between bg-white h-[80px] z-[10]">
      <Link href="/" className="flex items-center gap-x-6 cursor-pointer">
        <Image
          src="/assets/icons/Logomark.svg"
          alt="logo"
          width={50}
          height={50}
        />
        <p className="text-black text-2xl font-bold">Social</p>
      </Link>
      <SearchBar currentUser={user} />
      <div className="flex gap-x-4 items-center">
        <LogOutButton />
     
      <Link href="/messages" className="sm:hidden">
        <Send size={28} className="icon" />
        </Link>
        </div>
    </nav>
  );
};

export default Navbar;
