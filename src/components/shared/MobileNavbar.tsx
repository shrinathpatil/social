"use client";
import { cn } from "@/lib/utils";
import { Bell, Home, Search } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNavbar = () => {
  const pathname = usePathname();
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
        <Link href="/profile">
          <Image
            src="/assets/icons/Avatar.png"
            width={28}
            height={28}
            alt="avatar"
          />
        </Link>
      </ul>
    </div>
  );
};

export default MobileNavbar;
