"use server";

import { connectToDb } from "@/database/connection";
import { Chat, Message, User } from "@/database/models";
import { pusher } from "@/lib/pusher/server";
import { CreateMessageParams } from "@/types";

export const createMessage = async ({
  chatId,
  senderId,
  message,
}: CreateMessageParams) => {
  await connectToDb();
  try {
    const chat = await Chat.findOne({ chatId });
    const receiverId =
      chat?.members[0] === senderId ? chat.members[1] : chat?.members[0];

    await User.findByIdAndUpdate(receiverId, {
      $addToSet: { chats: chat._id },
    });

    const newMessage = await Message.create({
      chatId: chat._id,
      senderId,
      receiverId,
      message,
    });

    const messageData = await Message.findById(newMessage._id)
      .populate({
        path: "senderId",
        model: User,
        select: "_id image username profession",
      })
      .populate({
        path: "receiverId",
        model: User,
        select: "_id image username profession",
      });

    await Chat.findByIdAndUpdate(chat._id, {
      $push: { messages: newMessage._id },
    });

    await pusher.trigger(chatId, "new-message-event", messageData);

    return JSON.parse(JSON.stringify(newMessage));
  } catch (error) {
    console.log(error);
  }
};
