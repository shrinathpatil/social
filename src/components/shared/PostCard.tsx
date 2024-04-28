"use client";
import { getTimeAgoString } from "@/lib/utils";
import { IPost, IUser } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EditMenu from "./EditMenu";
import ImagesDisplay from "./ImagesDisplay";
import ShowComments from "./ShowComments";

interface Props {
  post: IPost;
  user: IUser;
}
const PostCard = ({ post, user }: Props) => {
  const postUser: IUser = post?.userId;
  const pathname = usePathname();
  const link =
    postUser?._id === user?._id ? "profile" : `/profile/${postUser?._id}`;
  return (
    <div className="w-full bg-white rounded-md px-6 border border-gray-200 shadow-md">
      <div className="flex justify-between items-center  px-2 py-4 border-b border-b-gray-200 ">
        <div className="flex items-center gap-x-8">
          <Link href={link} className="relative h-[50px] w-[50px]">
            <Image
              src={postUser?.image!}
              alt="avatar"
              fill
              className="rounded-full object-cover"
            />
          </Link>
          <div className="flex flex-col justify-center gap-y-1">
            <Link
              href={link}
              className="text-xl text-neutral-700 font-semibold"
            >
              {postUser?.username}
            </Link>
            <span className="text-neutral-500 text-sm">
              {postUser?.profession}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          {!pathname.includes("/profile/") && (
            <EditMenu ownerId={postUser?._id} postId={post?._id} user={user} />
          )}
          <span className="text-neutral-400 text-xs">
            {getTimeAgoString(post?.createdAt)}
          </span>
        </div>
      </div>
      <div className="py-4 px-6 text-sm text-neutral-700 ">
        {post?.description}
      </div>
      {post.images.length > 0 && (
        <div className="w-full flex justify-center rounded-lg overflow-hidden py-6">
          <ImagesDisplay images={post?.images} />
        </div>
      )}
      <div className="h-[1000px] overflow-y-auto">
        <ShowComments
          user={user}
          postId={post?._id}
          postUserId={post?.userId._id}
          targetUserId={post?.userId._id}
        />
      </div>
    </div>
  );
};

export default PostCard;
