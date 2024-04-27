import { getPosts } from "@/actions/post.action";
import { getUser } from "@/actions/user.action";
import { AddPost, Loader, PostsCollection } from "@/components/shared";
import { getSession } from "@/hooks/getSession";
import { IPost } from "@/types";

export const revalidate = 60;

const HomePage = async () => {
  const { userId } = getSession();
  const user = await getUser(userId);
  const posts: IPost[] = await getPosts();

  return (
    <div className=" w-full pb-[70px]">
      <AddPost user={user} />
      <PostsCollection user={user} postsType="all" posts={posts} />
    </div>
  );
};

export default HomePage;
