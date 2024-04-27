import { getUser } from "@/actions/user.action";
import { ProfileStats, ShowUserPosts } from "@/components/shared";
import { getSession } from "@/hooks/getSession";
import { IUser } from "@/types";

const ProfilePageOthers = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { userId } = getSession();
  const user: IUser = await getUser(userId);
  const profileUser: IUser = await getUser(id);
  return (
    <div className="flex flex-col">
      <ProfileStats
        followers={profileUser?.followers.length}
        following={profileUser?.following.length}
        posts={profileUser?.posts.length}
        profession={profileUser?.profession!}
        username={profileUser?.username}
        profileImage={profileUser?.image!}
        userId={profileUser?._id}
        others
        currentUser={user}
      />
      <ShowUserPosts user={profileUser} id={id} />
    </div>
  );
};

export default ProfilePageOthers;
