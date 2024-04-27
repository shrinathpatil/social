"use client";
import { followUser } from "@/actions/user.action";
import { IUser } from "@/types";
import { Plus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  user: IUser;
  currentUser: IUser;
}
const FriendCard = ({ user, currentUser }: Props) => {
  const handleFollow = async () => {
    const res = await followUser({
      triggerUserId: currentUser?._id,
      targetUserId: user?._id,
    });
    res && toast.success(`you started following ${user?.username}!`);
  };
  return (
    <div className="flex items-center gap-x-8 w-full px-5 py-2 hover:bg-[#f0f3f8] transition">
      <div className="relative w-[40px] h-[40px]">
        <Image
          src={user?.image!}
          fill
          alt="avatar"
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <h2 className="text-neutral-700 font-semibold">{user?.username}</h2>
        <p className="text-gray-300">{user?.profession}</p>
      </div>
      <div
        onClick={handleFollow}
        className="justify-self-end w-8 h-8 bg-gray-300 text-neutral-600 flex items-center justify-center rounded-md  flex-col"
      >
        <Plus size={22} className="icon " />
      </div>
    </div>
  );
};

export default FriendCard;
