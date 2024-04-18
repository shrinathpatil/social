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
import { CreateUserParams, UpdateUserParams } from "@/types";

export const getUser = async (clerkId: string) => {
  await connectToDb();
  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      console.log("user not found!");
    }

    return user;
  } catch (error) {}
};

export const createUser = async (user: CreateUserParams) => {
  await connectToDb();
  try {
    const isPresent = await User.findOne({ clerkId: user.clerkId });
    if (isPresent) {
      console.log("user already exists!");
      return isPresent;
    }
    const newUser = await User.create(user);

    console.log("new user created!");
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (user: UpdateUserParams) => {
  await connectToDb();
  try {
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: user.clerkId },
      user,
      { new: true }
    );

    if (updatedUser) {
      console.log("user updated!");
      return updatedUser;
    }
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
      return;
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
