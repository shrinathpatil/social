"use client";
import { getChatBox } from "@/actions/chat.action";
import { createMessage } from "@/actions/message.action";
import { IChat, IUser } from "@/types";
import { Send } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  user: IUser;
}
const SendMessage = ({ user }: Props) => {
  const { chatId } = useParams();
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return toast.error("type some message!");
    try {
      const res = await createMessage({
        //@ts-ignore
        chatId,
        senderId: user._id,
        message,
      });

      if (res) {
        setMessage("");
      }
    } catch (error) {
      toast.error("failed to send message!");
    }
  };
  return (
    <form
      className="shadow-md justify-self-end z-[4] items-center w-full px-5 py-2 flex gap-x-4"
      onSubmit={handleSubmit}
    >
      <div className="relative w-[40px] h-[40px]">
        <Image
          src={user?.image!}
          alt="avatar"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <input
        type="text"
        placeholder="start messaging..."
        className="w-full p-3 rounded-md border border-gray-200 outline-none text-sm text-neutral-600"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Send
        size={22}
        className="text-gray-400 cursor-pointer"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default SendMessage;
