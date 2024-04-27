import { getUser } from "@/actions/user.action";
import { ProfileStats, ShowUserPosts } from "@/components/shared";
import { getSession } from "@/hooks/getSession";
import { IUser } from "@/types";

const ProfilePage = async () => {
  const { userId } = getSession();
  const user: IUser = await getUser(userId);
  return (
    <div className="flex flex-col pb-[70px]">
      <ProfileStats
        userId={userId}
        followers={user?.followers.length}
        following={user?.following.length}
        posts={user?.posts.length}
        profession={user?.profession!}
        profileImage={user?.image!}
        username={user?.username}
      />
      <ShowUserPosts user={user} id={userId} />
    </div>
  );
};

export default ProfilePage;
