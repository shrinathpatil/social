"use client";
import { cn } from "@/lib/utils";
import { Bell, Handshake, Home, Send, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileLinks = () => {
  const pathname = usePathname();
  const links = [
    { Icon: Home, route: "/", label: "Home" },
    { Icon: User, route: "/profile", label: "Profile" },
    { Icon: Send, route: "/messages", label: "Messages" },
    { Icon: Bell, route: "/notifications", label: "Notifications" },
  ];
  return (
    <ul className="flex flex-col gap-y-6  mt-16">
      {links.map(({ Icon, route, label }) => {
        const isActive = route === pathname;
        return (
          <Link
            key={route}
            href={route}
            className={cn(
              "link-icon flex gap-x-6 items-center",
              isActive
                ? "text-neutral-700"
                : "text-gray-400 hover:text-neutral-700"
            )}
          >
            <Icon size={24} />
            <p className="max-lg:hidden">{label}</p>
          </Link>
        );
      })}
      <div
        className={cn(
          "link-icon  gap-x-6 items-center hidden max-xl:flex",
          "text-gray-400 hover:text-neutral-700"
        )}
      >
        <Handshake size={24} />
        <p className="max-lg:hidden">Suggested Friends</p>
      </div>
    </ul>
  );
};

export default ProfileLinks;
