"use client";

import { getChatMessages } from "@/actions/chat.action";
import { pusher } from "@/lib/pusher/client";
import { getTimeAgoString } from "@/lib/utils";
import { IMessages, IUser } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";

interface Props {
  user: IUser;
}
const ChatBox = ({ user }: Props) => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState<IMessages[]>([]);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      //@ts-ignore
      const res = await getChatMessages(chatId!);
      pusher
        .subscribe(chatId as string)
        .bind("new-message-event", (data: IMessages) => {
          setMessages((prev) => [...prev, data]);
        });
      setMessages(res);
    };
    fetchMessages();

    return () => {
      pusher.unsubscribe(chatId as string);
    };
  }, [chatId]);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatId, messages.length]);
  return (
    <div className="w-full h-[460px] overflow-y-auto z-[2] flex flex-col px-3 py-1 gap-y-2">
      {messages?.map((message) => {
        return (
          <Message
            key={message._id}
            user={message?.senderId}
            message={message.message}
            isSender={message?.senderId?._id === user._id}
            time={getTimeAgoString(message?.createdAt)}
          />
        );
      })}
      <div ref={divRef} className="" />
    </div>
  );
};

export default ChatBox;
