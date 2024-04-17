import { Plus } from "lucide-react";
import Image from "next/image";

const FriendCard = () => {
  return (
    <div className="flex items-center gap-x-8">
      <Image
        src="/assets/icons/Avatar.png"
        width={60}
        height={60}
        alt="avatar"
        className="rounded-full"
      />
      <div className="flex flex-col gap-y-1">
        <h2 className="text-neutral-700 font-semibold">Friend</h2>
        <p className="text-gray-300">profession</p>
      </div>
      <div className="w-8 h-8 bg-gray-300 text-neutral-600 flex items-center justify-center rounded-md  flex-col">
        <Plus size={22} className="icon" />
      </div>
    </div>
  );
};

export default FriendCard;
