"use server";

import { connectToDb } from "@/database/connection";
import { Comment, Notification, Post, User } from "@/database/models";
import { pusher } from "@/lib/pusher/server";
import { CommentParams } from "@/types";
import { revalidatePath } from "next/cache";

export const commentPost = async ({
  triggerUserId,
  targetUserId,
  postId,
  comment,
}: CommentParams) => {
  await connectToDb();
  try {
    const newComment = await Comment.create({
      userId: triggerUserId,
      postId,
      comment,
    });

    await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } },
      { new: true }
    );
    console.log("comment created successfully");
    revalidatePath("/");

    if (triggerUserId === targetUserId) {
      return JSON.parse(JSON.stringify(newComment));
    }

    const notification = await Notification.create({
      triggerUserId,
      targetUserId,
      notificationType: "comment",
    });

    await User.findByIdAndUpdate(targetUserId, {
      $push: { notifications: notification._id },
    });
    await pusher.trigger(targetUserId, "notification-created-event", "");

    revalidatePath("/notifications");
    return JSON.parse(JSON.stringify(newComment));
  } catch (error) {
    console.log(error);
  }
};

export const getPostComments = async (postId: string) => {
  await connectToDb();
  try {
    const comments = await Comment.find({ postId })
      .populate({
        path: "userId",
        model: User,
        select: "_id username image profession",
      })
      .sort({ createdAt: "desc" });
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.log(error);
  }
};
