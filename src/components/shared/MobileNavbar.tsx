"use client";
import { getUser } from "@/actions/user.action";
import { cn } from "@/lib/utils";
import { IUser } from "@/types";
import { Bell, Home, Search } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNavbar = ({userId}:{userId:string}) => {
  const pathname = usePathname();
  const [user, setUser] = useState<IUser | null>(null);
  const links = [
    {
      route: "/",
      Icon: Home,
    },
    {
      route: "/search",
      Icon: Search,
    },
    {
      route: "/notifications",
      Icon: Bell,
    },
  ];

   useEffect(() => {
    const getCurrentUser = async () => {
      const res = await getUser(userId!);
      setUser(res);
    }
    getCurrentUser();
  },[userId])
  return (
    <div className="fixed hidden max-sm:flex bottom-0 left-0 h-[72px] w-full z-[10]">
      <ul className="bg-white w-full h-full flex items-center justify-between px-10 py-6">
        {links.map(({ Icon, route }) => {
          const isActive = route === pathname;
          return (
            <Link key={route} href={route}>
              <Icon
                size={26}
                className={cn(
                  "link-icon",
                  isActive
                    ? "text-primary"
                    : "text-gray-400 hover:text-neutral-700"
                )}
              />
            </Link>
          );
        })}
        {user &&<Link href="/profile" className="relative w-[28px] h-[28px]">
          <Image
            src={user?.image!}
            fill
            alt="avatar"
            className="rounded-full object-cover"
          />
        </Link>}
      </ul>
    </div>
  );
};

export default MobileNavbar;
