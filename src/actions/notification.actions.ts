"use server";

import { connectToDb } from "@/database/connection";
import { Notification, User } from "@/database/models";
import { pusher } from "@/lib/pusher/server";
import { revalidatePath } from "next/cache";

export const getUserNotifications = async (userId: string) => {
  await connectToDb();
  try {
    const notifications = await Notification.find({ targetUserId: userId })
      .populate({
        path: "triggerUserId",
        model: User,
        select: "_id image username ",
      })
      .sort({ createdAt: "asc" });

    return JSON.parse(JSON.stringify(notifications));
  } catch (error) {
    console.log(error);
  }
};

export const getUserNotificationCount = async (userId: string) => {
  await connectToDb();
  try {
    const count = await Notification.find({
      targetUserId: userId,
    }).countDocuments();
    return { count };
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotification = async (id: string, userId: string) => {
  await connectToDb();
  try {
    await Notification.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { notifications: id } });
    revalidatePath("/notifications");
    await pusher.trigger(userId, "notification-deleted-event", "");
    return { message: "notification deleted successfully!" };
  } catch (error) {
    console.log(error);
  }
};
