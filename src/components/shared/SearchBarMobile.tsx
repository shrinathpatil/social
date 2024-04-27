"use client";

import { followUser, getSearchUsers } from "@/actions/user.action";
import { cn } from "@/lib/utils";
import { IUser } from "@/types";
import { Search, UserCheck, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  currentUser: IUser;
}
const SearchBarMobile = ({ currentUser }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await getSearchUsers(search, currentUser?._id);
      setSuggestions(res);
    };
    const timeout = setTimeout(() => {
      search && getUsers();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleFollow = async (id: string, isFollowed: boolean) => {
    if (isFollowed) {
      toast.info("Already followed!");
      return;
    }
    try {
      const res = await followUser({
        triggerUserId: currentUser._id,
        targetUserId: id,
      });
      if (res) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="w-full px-2 rounded-md overflow-hidden flex items-center gap-x-2 border border-gray-200">
        <Search size={20} className="text-gray-300" />
        <input
          type="text"
          placeholder="Search for friends..."
          className=" text-gray-600 text-sm w-full py-2 px-4 rounded-md outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {!search && (
        <p className="text-sm text-neutral-400 font-normal">
          Try searching for friends...
        </p>
      )}
      {search &&
        (suggestions.length > 0 ? (
          <div className="flex flex-col gap-y-2 w-full p-4 max-h-[700px] overflow-y-auto">
            {suggestions.map((user) => {
              const isFollowed = currentUser?.following.find(
                (id) => id === user._id
              );

              return (
                <div className="flex items-center gap-x-6 " key={user?._id}>
                  <Link
                    href={`/profile/${user._id}`}
                    className="relative w-[40px] h-[40px]"
                  >
                    <Image
                      src={user.image!}
                      alt={user?.username}
                      fill
                      className="rounded-full object-cover"
                    />
                  </Link>
                  <div className="flex flex-col gap-y-0.5 justify-center">
                    <h2 className="text-neutral-700 text-lg font-semibold">
                      {" "}
                      {user.username}
                    </h2>
                    <span className="text-neutral-500 text-sm font-light">
                      {user.profession}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={cn(
                      "bg-primary text-white px-4 py-1 rounded-md outline-none cursor-pointer flex items-center gap-x-3",
                      isFollowed && "bg-green-400"
                    )}
                    onClick={() => handleFollow(user._id, !!isFollowed)}
                  >
                    {isFollowed ? (
                      <UserCheck size={18} className="text-white" />
                    ) : (
                      <UserPlus size={18} className="text-white" />
                    )}{" "}
                    {isFollowed ? "Followed" : "Follow"}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-red-400">no results found!</p>
        ))}
    </div>
  );
};

export default SearchBarMobile;
