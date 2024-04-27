"use server";

import { connectToDb } from "@/database/connection";
import {
  Chat,
  Comment,
  Message,
  Notification,
  Post,
  User,
} from "@/database/models";
import { pusher } from "@/lib/pusher/server";
import {
  ChatObject,
  CreateUserParams,
  FollowUserParams,
  IChat,
  IMessages,
  IUser,
  LikePostParams,
  SavePostParams,
  UnfollowUserParams,
  UpdateUserParams,
} from "@/types";
import { ObjectId } from "mongoose";
import { revalidatePath } from "next/cache";

export const getUser = async (userId: string) => {
  await connectToDb();
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("user not found!");
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {}
};

export const getUserByClerkId = async (clerkId: string) => {
  await connectToDb();
  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      console.log("user not found!");
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user: CreateUserParams) => {
  await connectToDb();
  try {
    const isPresent = await User.findOne({ clerkId: user.clerkId });
    if (isPresent) {
      console.log("user already exists!");
      return JSON.parse(JSON.stringify(isPresent));
    }
    const newUser = await User.create(user);

    console.log("new user created!");
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (user: UpdateUserParams) => {
  await connectToDb();
  try {
    console.log(user);
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: user.clerkId },
      user,
      { new: true }
    );

    if (updatedUser) {
      console.log("user updated!");
      revalidatePath("/");
      revalidatePath("/profile");
      return JSON.parse(JSON.stringify(updatedUser));
    }
    console.log("user not found!");
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async (clerkId: string) => {
  await connectToDb();
  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      console.log("user not found!");
      return { message: "user not found!" };
    }
    await User.findOneAndDelete({ clerkId });
    await Post.deleteMany({ userId: user._id });
    await Comment.deleteMany({ userId: user._id });
    await Notification.deleteMany({ targetUserId: user._id });
    const chats = await Chat.find({ members: user._id });
    await Chat.deleteMany({ members: user._id });
    const deleteMessages = chats.map(async (chat) => {
      await Message.deleteMany({ chatId: chat._id });
    });
    Promise.all(deleteMessages);

    console.log("user deleted!");
    return { message: "user deleted!" };
  } catch (e) {
    console.log(e);
  }
};

export const savePost = async ({ userId, postId, path }: SavePostParams) => {
  await connectToDb();
  try {
    const user = await User.findById(userId);

    const isSaved = user?.savedPosts.find(
      (id: ObjectId) => id.toString() === postId
    );
    if (isSaved) {
      await User.findByIdAndUpdate(userId, { $pull: { savedPosts: postId } });
      revalidatePath(path);
      return { message: "post removed from saved!" };
    }
    await User.findByIdAndUpdate(userId, { $push: { savedPosts: postId } });
    revalidatePath(path);
    revalidatePath("/profile");
    return { message: "post saved!" };
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async ({
  userId,
  ownerId,
  postId,
  path,
}: LikePostParams) => {
  await connectToDb();
  try {
    const user = await User.findById(userId);
    const isLiked = user.likedPosts.find(
      (id: ObjectId) => id.toString() === postId
    );
    if (isLiked) {
      await User.findByIdAndUpdate(userId, { $pull: { likedPosts: postId } });
      revalidatePath(path);
      return { message: "post removed from liked posts!" };
    }
    await User.findByIdAndUpdate(userId, { $push: { likedPosts: postId } });

    if (userId !== ownerId) {
      const notification = await Notification.create({
        triggerUserId: userId,
        targetUserId: ownerId,
        notificationType: "like",
      });
      await User.findByIdAndUpdate(ownerId, {
        $push: { notifications: notification._id },
      });
      await pusher.trigger(ownerId, "notification-created-event", "");

      revalidatePath("/notifications");
    }
    revalidatePath(path);
    revalidatePath("/profile");

    return { message: "post liked!" };
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async ({
  triggerUserId,
  targetUserId,
}: FollowUserParams) => {
  await connectToDb();
  try {
    await User.findByIdAndUpdate(triggerUserId, {
      $push: { following: targetUserId },
    });
    await User.findByIdAndUpdate(targetUserId, {
      $push: { followers: triggerUserId },
    });

    const notification = await Notification.create({
      triggerUserId,
      targetUserId,
      notificationType: "follow",
    });
    await User.findByIdAndUpdate(targetUserId, {
      $push: { notifications: notification._id },
    });
    await pusher.trigger(targetUserId, "notification-created-event", "");
    revalidatePath("/");
    revalidatePath("/profile");
    revalidatePath(`/profile/${targetUserId}`);
    revalidatePath("/notifications");

    return { message: "user followed!" };
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async ({
  targetUserId,
  triggerUserId,
}: UnfollowUserParams) => {
  await connectToDb();
  try {
    await User.findByIdAndUpdate(triggerUserId, {
      $pull: { following: targetUserId },
    });
    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: triggerUserId },
    });

    revalidatePath("/");
    revalidatePath("/profile");

    revalidatePath(`/profile/${targetUserId}`);
    revalidatePath("/notifications");

    return { message: "user unfollowed!" };
  } catch (error) {
    console.log(error);
  }
};

export const getSearchUsers = async (search: string, currentUserId: string) => {
  await connectToDb();
  try {
    const users = await User.find({
      username: { $regex: search, $options: "i" },
      _id: { $ne: currentUserId },
    }).limit(10);

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingUsers = async (userId: string) => {
  await connectToDb();
  try {
    const user = await User.findById(userId).populate({
      path: "following",
      model: User,
      select: "_id username image profession",
    });
    if (user) {
      return JSON.parse(JSON.stringify(user.following));
    }
    console.log("user not found!");
  } catch (error) {
    console.log(error);
  }
};

export const getUserChats = async (userId: string) => {
  await connectToDb();
  try {
    const user = await User.findById(userId).populate({
      path: "chats",
      model: Chat,
    });

    const chats: ChatObject[] = user?.chats?.map((chat: IChat) => {
      if (chat?.members[0].toString() === userId) {
        return { id: chat._id, chatId: chat.chatId, userId: chat?.members[1] };
      }
      return { id: chat._id, chatId: chat.chatId, userId: chat?.members[0] };
    });

    const friends = chats.map(async (chat) => {
      const friend = await User.findById(chat.userId).select(
        "_id username image profession"
      );

      const lastMessage: IMessages[] = await Message.find({
        chatId: chat?.id,
      })
        .sort({ createdAt: "desc" })
        .limit(1);

      return {
        chatId: chat.chatId,
        friend: friend,
        message: lastMessage[0]?.message,
      };
    });

    const res = await Promise.all(friends);

    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};

export const getSuggestionFriends = async (userId: string) => {
  await connectToDb();
  try {
    const user = await User.findById(userId);
    const followings = user?.following;

    if (followings?.length === 0) {
      const users = await User.find({ _id: { $ne: userId } }).limit(6);

      return JSON.parse(JSON.stringify(users));
    }

    let newUsers: any[] = [];
    const othersUsers = followings?.map(async (follower: any) => {
      const user = await User.findById(follower);
      user?.following?.forEach((u: any) => {
        if (
          !followings.find(
            (f: any) => f.toString() === u.toString() || u.toString() === userId
          )
        ) {
          newUsers.push(u);
        }
      });
    });
    await Promise.all(othersUsers);

    const suggestions = newUsers?.map(async (u: any) => {
      const user = await User.findById(u).select(
        "_id username image profession"
      );
      return user;
    });
    const res = await Promise.all(suggestions);

    return JSON.parse(JSON.stringify(res));
  } catch (e) {
    console.log(e);
  }
};
