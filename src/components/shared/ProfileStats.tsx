"use client";
import { followUser, unfollowUser } from "@/actions/user.action";
import { cn } from "@/lib/utils";
import { IUser } from "@/types";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Tabs from "./Tabs";

interface Props {
  currentUser?: IUser;
  profileImage: string;
  username: string;
  profession: string;
  posts: number;
  followers: number;
  following: number;
  others?: boolean;
  userId: string;
}
const ProfileStats = ({
  userId,
  currentUser,
  followers,
  following,
  posts,
  profession,
  profileImage,
  username,
  others,
}: Props) => {
  const handleFollow = async (isFollowed: boolean) => {
    if (isFollowed) {
      try {
        const res = await unfollowUser({
          triggerUserId: currentUser?._id,
          targetUserId: userId,
        });
        if (res) {
          toast.success(res.message);
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
      return;
    }
    try {
      const res = await followUser({
        triggerUserId: currentUser?._id,
        targetUserId: userId,
      });
      if (res) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const isFollowed = currentUser?.following.find((id) => id === userId);
  return (
    <>
      <section className="flex w-full bg-white rounded-md shadow-md flex-col gap-y-5">
        <div className="w-full border-b border-gray-200 p-8">
          <div className="flex items-center gap-x-6">
            <div className="relative w-[65px] h-[65px]">
              <Image
                src={profileImage}
                alt="profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-y-0.5">
              <h2 className="text-neutral-800 text-lg font-semibold">
                {username}
              </h2>
              <span className="text-xs text-neutral-600">{profession}</span>
            </div>
            {others && (
              <Button
                onClick={() => handleFollow(!!isFollowed)}
                className={cn(
                  "bg-primary text-white px-4 py-2 rounded-md cursor-pointer ",
                  isFollowed && "bg-red-400"
                )}
              >
                {isFollowed ? "UnFollow" : "Follow"}
              </Button>
            )}
          </div>

          <div className="flex items-center gap-x-4 p-5">
            <div className="flex flex-col items-center gap-y-1">
              <span className="text-neutral-800 font-semibold">{posts}</span>
              <span className="text-xs text-neutral-500">Posts</span>
            </div>
            <div className="flex flex-col items-center gap-y-1">
              <span className="text-neutral-800 font-semibold">
                {followers}
              </span>
              <span className="text-xs text-neutral-500">Followers</span>
            </div>
            <div className="flex flex-col items-center gap-y-1">
              <span className="text-neutral-800 font-semibold">
                {following}
              </span>
              <span className="text-xs text-neutral-500">Following</span>
            </div>
          </div>
        </div>
        {<Tabs />}
      </section>
    </>
  );
};

export default ProfileStats;
