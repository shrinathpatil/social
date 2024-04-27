"use client";
import { getUserNotificationCount } from "@/actions/notification.actions";
import { pusher } from "@/lib/pusher/client";
import { cn } from "@/lib/utils";
import { IUser } from "@/types";
import { Bell, Handshake, Home, Send, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import SuggestFriendsModal from "./SuggestFriendsModal";

const ProfileLinks = ({ user }: { user: IUser }) => {
  const pathname = usePathname();
  const links = [
    { Icon: Home, route: "/", label: "Home" },
    { Icon: User, route: "/profile", label: "Profile" },
    { Icon: Send, route: "/messages", label: "Messages" },
    { Icon: Bell, route: "/notifications", label: "Notifications" },
  ];

  const [notifications, setNotifications] = useState<number>(0);
  useEffect(() => {
    const getCount = async () => {
      const res = await getUserNotificationCount(user?._id);
      setNotifications(res?.count!);

      pusher.subscribe(user?._id).bind("notification-created-event", () => {
        getCount();
      });
      pusher.subscribe(user?._id).bind("notification-deleted-event", () => {
        getCount();
      });
    };

    user && getCount();

    return () => {
      pusher.unsubscribe(user?._id);
    };
  }, [user?.id]);

  return (
    <ul className="flex flex-col gap-y-6  mt-16">
      {links.map(({ Icon, route, label }) => {
        const isActive = route === pathname;
        const isNotification = label === "Notifications";
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
            <div className="relative z-[2]">
              <Icon size={24} />
              {isNotification && notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-primary text-white  z-[4] text-xs">
                  {notifications > 10 ? "10+" : notifications}
                </span>
              )}
            </div>
            <p className="max-lg:hidden">{label}</p>
          </Link>
        );
      })}
      <SuggestFriendsModal user={user}>
        <div
          className={cn(
            "link-icon  gap-x-6 items-center hidden max-xl:flex",
            "text-gray-400 hover:text-neutral-700"
          )}
        >
          <Handshake size={24} />
          <p className="max-lg:hidden">Suggested Friends</p>
        </div>
      </SuggestFriendsModal>
    </ul>
  );
};

export default ProfileLinks;
