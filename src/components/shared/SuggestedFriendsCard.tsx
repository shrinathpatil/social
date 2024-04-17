import FriendCard from "./FriendCard";

const SuggestedFriendsCard = () => {
  return (
    <div className="w-full max-w-[320px] h-[500px] bg-white hidden xl:flex flex-col rounded-md overflow-hidden border border-gray-200">
      <div className="w-full h-[72px]  px-6 py-6 text-neutral-600 border-b  border-gray-200">
        Suggested Friends
      </div>
      <div className="friends flex py-8 overflow-y-auto flex-col items-center w-full gap-y-6">
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
      </div>
    </div>
  );
};

export default SuggestedFriendsCard;
