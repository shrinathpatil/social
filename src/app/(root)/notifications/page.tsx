"use client";
import { getUserNotifications } from "@/actions/notification.actions";
import { getUserByClerkId } from "@/actions/user.action";
import { DeleteNotification } from "@/components/shared";
import { pusher } from "@/lib/pusher/client";
import { getTimeAgoString } from "@/lib/utils";
import { INotification, IUser, NotificationType } from "@/types";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

const NotificationPage = async () => {
  const { user } = useClerk();
  const [dbUser, setdbUser] = useState<IUser>();
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserByClerkId(user?.id!);
      setdbUser(res);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getUserNotifications(dbUser?._id!);
      setNotifications(res);
      pusher.subscribe(dbUser?._id!).bind("notification-created-event", () => {
        fetchNotifications();
      });
      pusher.subscribe(dbUser?._id!).bind("notification-deleted-event", () => {
        fetchNotifications();
      });
    };

    dbUser && fetchNotifications();
    return () => pusher.unsubscribe(dbUser?._id!);
  }, [dbUser]);
  const getSuffix = (notificationType: NotificationType) => {
    if (notificationType === "like") {
      return "liked your post!";
    }
    if (notificationType === "comment") {
      return "commented on your post!";
    }
    if (notificationType === "follow") {
      return "started following you!";
    }
  };

  return (
    <div className="bg-white rounded-md border border-gray-200 w-full">
      <h2 className="text-lg text-neutral-800 font-semibold px-5 py-2 border-b border-gray-200">
        Notifications
      </h2>

      <div className="flex w-full px-4 flex-col py-2 items-center">
        {notifications.map((notification) => {
          return (
            <div
              className="group w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-[#f0f3f8] cursor-pointer"
              key={notification?._id}
            >
              <div className="flex gap-x-4 items-center px-4 py-2">
                <span className="relative w-[35px] h-[35px] ">
                  <Image
                    src={notification.triggerUserId?.image!}
                    fill
                    alt="avatar"
                    className="rounded-full object-cover"
                  />
                </span>
                <h2 className="text-lg text-neutral-800 font-semibold">
                  {notification.triggerUserId?.username}
                </h2>

                <p className="text-neutral-600 text-sm">
                  {getSuffix(notification.notificationType)}
                </p>
              </div>
              <span className="flex flex-col gap-y-1 items-center">
                <DeleteNotification
                  userId={dbUser?._id}
                  id={notification._id}
                />
                <p className="text-xs text-neutral-500">
                  {getTimeAgoString(notification?.createdAt)}
                </p>
              </span>
            </div>
          );
        })}
        {notifications?.length === 0 && (
          <div className="text-neutral-500 text-sm p-4">No Notifications!</div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
