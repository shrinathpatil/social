"use client";

import { createChat } from "@/actions/chat.action";
import { IUser } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  user: IUser;
  currentUser: IUser;
}
const ChatCard = ({ user, currentUser }: Props) => {
  const router = useRouter();
  const handlecCreateChat = async () => {
    try {
      const res = await createChat({
        triggerUserId: currentUser._id,
        targetUserId: user._id,
      });
      if (res) {
        toast.success("chat created successfully");
        router.push(`/messages/${res?.chatId}`);
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
  };
  return (
    <div
      className="flex items-center gap-x-6 cursor-pointer  transition hover:bg-[#f0f3f8] p-2 rounded-md"
      onClick={handlecCreateChat}
    >
      <Link
        href={`/profile/${user._id}`}
        className="relative w-[40px] h-[40px]"
      >
        <Image
          src={user?.image!}
          alt={user?.username}
          fill
          className="rounded-full object-cover"
        />
      </Link>
      <div className="flex flex-col gap-y-0.5 justify-center">
        <h2 className="text-neutral-700 text-lg font-semibold">
          {user?.username}
        </h2>
        <span className="text-neutral-500 text-sm font-light">
          {user?.profession}
        </span>
      </div>
    </div>
  );
};

export default ChatCard;
