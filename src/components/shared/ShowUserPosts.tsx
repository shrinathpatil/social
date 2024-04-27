"use client";

import { getMyPosts, getSavedPosts } from "@/actions/post.action";
import { IPost, IUser } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostsCollection from "./PostsCollection";
import Settings from "./Settings";

interface Props {
  id: string;
  user: IUser;
}
const ShowUserPosts = ({ id, user }: Props) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const saved = useSearchParams().get("saved");
  const settings = useSearchParams().get("settings");
  useEffect(() => {
    const getPosts = async () => {
      if (settings) {
        return;
      }
      if (saved) {
        const res = await getSavedPosts(id);
        setPosts(res);
        return;
      }
      const res = await getMyPosts(id);
      setPosts(res);
    };
    getPosts();
  }, [saved, id, settings]);

  return (
    <div className="flex flex-col">
      {settings ? (
        <Settings user={user} />
      ) : (
        <PostsCollection
          user={user}
          posts={posts}
          postsType={saved ? "saved" : "all"}
        />
      )}
    </div>
  );
};

export default ShowUserPosts;
