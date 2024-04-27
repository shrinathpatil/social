"use server";

import { connectToDb } from "@/database/connection";
import { Chat, Message, User } from "@/database/models";
import { CreateChatParams } from "@/types";

import { revalidatePath } from "next/cache";

export const createChat = async ({
  triggerUserId,
  targetUserId,
}: CreateChatParams) => {
  await connectToDb();
  try {
    const id1 = `${triggerUserId}-${targetUserId}`;
    const id2 = `${targetUserId}-${triggerUserId}`;
    const chat1 = await Chat.findOne({ chatId: id1 });
    if (chat1) {
      await User.findByIdAndUpdate(triggerUserId, {
        $addToSet: { chats: chat1._id },
      });
      return JSON.parse(JSON.stringify(chat1));
    }
    const chat2 = await Chat.findOne({ chatId: id2 });
    if (chat2) {
      await User.findByIdAndUpdate(triggerUserId, {
        $addToSet: { chats: chat2._id },
      });
      return JSON.parse(JSON.stringify(chat2));
    }

    const chatId = `${triggerUserId}-${targetUserId}`;
    const chat = await Chat.create({
      chatId,
      members: [triggerUserId, targetUserId],
    });

    await User.findByIdAndUpdate(triggerUserId, { $push: { chats: chat._id } });
    revalidatePath("/messages");
    revalidatePath("/messages/*");
    return JSON.parse(JSON.stringify(chat));
  } catch (error) {
    console.log(error);
  }
};

export const getChatBox = async (chatId: string) => {
  await connectToDb();
  try {
    const chat = await Chat.findOne({ chatId });
    return JSON.parse(JSON.stringify(chat));
  } catch (e) {
    console.log(e);
  }
};

export const getChatMessages = async (chatId: string) => {
  await connectToDb();
  try {
    const chat = await Chat.findOne({ chatId });

    const messages = await Message.find({ chatId: chat._id })
      .populate({
        path: "senderId",
        model: User,
        select: "_id username image profession",
      })
      .populate({
        path: "receiverId",
        model: User,
        select: "_id username image profession",
      })
      .sort({ createdAt: "asc" });

    return JSON.parse(JSON.stringify(messages));
  } catch (e) {
    console.log(e);
  }
};
