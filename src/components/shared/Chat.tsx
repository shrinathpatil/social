"use client";
import { cn } from "@/lib/utils";
import { IUser } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Chat = { chatId: string; friend: IUser; message?: string };

interface Props {
  chat: Chat;
  isActive?: boolean;
}
const Chat = ({ chat, isActive }: Props) => {
  return (
    <Link
      href={`/messages/${chat.chatId}`}
      className={cn(
        "flex items-center gap-x-4 w-full px-4 py-2 text-neutral-500 transition hover:text-neutral-800 hover:bg-[#f0f3f8]",
        isActive && "bg-[#f0f3f8] text-neutral-800"
      )}
      key={chat?.chatId}
    >
      <div className="relative w-[40px] h-[40px] ">
        <Image
          src={chat?.friend?.image!}
          fill
          className="rounded-full object-cover"
          alt="avatar"
        />
      </div>

      <h3 className="text-neutral-700 text-sm font-semibold">
        {chat?.friend?.username}
      </h3>
    </Link>
  );
};

export default Chat;
