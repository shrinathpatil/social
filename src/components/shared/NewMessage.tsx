"use client";
import { getFollowingUsers, getSearchUsers } from "@/actions/user.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IUser } from "@/types";
import { Search } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import ChatCard from "./ChatCard";

interface Props {
  user: IUser;
  children: ReactNode;
}
const NewMessage = ({ user, children }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [friends, setFriends] = useState<IUser[]>([]);
  const [searchResult, setSearchResult] = useState<IUser[]>([]);

  useEffect(() => {
    const getUserFriends = async () => {
      const users = await getFollowingUsers(user?._id);
      setFriends(users);
    };

    getUserFriends();
  }, [user?._id]);

  useEffect(() => {
    const getSearchResult = async () => {
      const res: IUser[] = await getSearchUsers(search, user?._id);
      const filtered = res.filter(
        (resUser) => !user.following.includes(resUser._id)
      );
      setSearchResult(filtered);
    };
    const timeout = setTimeout(() => {
      search.trim() ? getSearchResult() : setSearchResult([]);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white p-4 flex flex-col items-center">
        <DialogHeader className="w-full px-4">
          <DialogTitle className="text-neutral-800 text-lg font-semibold">
            Friends
          </DialogTitle>
          <DialogDescription className="text-neutral-400 text-sm ">
            start chat with your friends or search for new friends...
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full items-center gap-x-2 border border-gray-200 rounded-md px-2">
          <Search size={20} className="text-neutral-500" />
          <input
            type="text"
            placeholder="search for friends..."
            className="w-full px-4 py-2 text-neutral-500 text-sm outline-none  "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full p-4 max-h-[700px] overflow-y-auto">
          {friends.map((friend) => {
            return <ChatCard currentUser={user} user={friend} key={user._id} />;
          })}
          {searchResult.map((res) => {
            return <ChatCard currentUser={user} user={res} key={user._id} />;
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewMessage;
