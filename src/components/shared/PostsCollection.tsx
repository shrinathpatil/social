"use client";
import { IPost, IUser } from "@/types";
import PostCard from "./PostCard";

interface Props {
  postsType: "all" | "saved";
  posts: IPost[] | [];
  user:IUser
}
const PostsCollection = ({ posts, postsType,user }: Props) => {
  return (
    <div className="w-full gap-y-4 flex flex-col items-center py-10">
      {posts?.length > 0
        ? posts.map((post) => {
            return <PostCard key={post._id} user={user} post={post} />;
          })
        : postsType === "saved" && (
            <div className="text-neutral-800 text-xl font-semibold ">
              No Saved Posts!
            </div>
          )}
    </div>
  );
};

export default PostsCollection;
