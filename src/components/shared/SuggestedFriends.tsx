"use client";
import { cn } from "@/lib/utils";
import { IUser } from "@/types";
import { usePathname } from "next/navigation";
import FriendCard from "./FriendCard";

interface Props {
  suggestions: IUser[];
  currentUser: IUser;
}
const SuggestedFriends = ({ suggestions, currentUser }: Props) => {
  const pathname = usePathname();
  if (pathname.includes("/messages")) {
    return null;
  }
  return (
    <div
      className={cn(
        "shadow-md w-full max-w-[320px] h-[500px] bg-white hidden xl:flex flex-col rounded-md overflow-hidden border border-gray-100"
      )}
    >
      <div className="w-full h-[72px]  px-6 py-6 text-neutral-600 border-b  border-gray-100">
        Suggested Friends
      </div>
      <div className="friends flex py-8 overflow-y-auto flex-col items-center w-full gap-y-6">
        {suggestions?.length > 0 ? (
          suggestions.map((suggestion) => (
            <FriendCard
              key={suggestion._id}
              user={suggestion}
              currentUser={currentUser!}
            />
          ))
        ) : (
          <div className="text-neutral-500 p-4">No suggestions!</div>
        )}
      </div>
    </div>
  );
};

export default SuggestedFriends;
