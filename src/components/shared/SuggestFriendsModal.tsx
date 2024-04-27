"use client";
import { getSuggestionFriends } from "@/actions/user.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IUser } from "@/types";
import { ReactNode, useEffect, useState } from "react";
import FriendCard from "./FriendCard";

interface Props {
  children: ReactNode;
  user: IUser;
}
const SuggestFriendsModal = ({ children, user }: Props) => {
  const [suggestions, setSuggestions] = useState<IUser[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    const getSuggestions = async () => {
      const res = await getSuggestionFriends(user?._id);
      setSuggestions(res);
    };
    getSuggestions();
  }, [open]);

  return (
    <Dialog onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white p-4 flex flex-col items-center">
        <DialogHeader className="w-full px-4">
          <DialogTitle className="text-neutral-800 text-lg font-semibold">
            Suggested Friends
          </DialogTitle>
          <DialogDescription className="text-neutral-400 text-sm ">
            friends suggested for you...
          </DialogDescription>
        </DialogHeader>
        <div className="friends flex py-8 overflow-y-auto flex-col items-center w-full gap-y-6">
          {suggestions?.length > 0 ? (
            suggestions.map((suggestion) => (
              <FriendCard
                key={suggestion._id}
                user={suggestion}
                currentUser={user!}
              />
            ))
          ) : (
            <div className="text-neutral-500 p-4">No suggestions!</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestFriendsModal;
