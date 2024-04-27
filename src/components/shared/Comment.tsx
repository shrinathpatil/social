"use client";
import { createChat } from "@/actions/chat.action";
import { getTimeAgoString } from "@/lib/utils";
import { IComment } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  comment: IComment;
  userId: string;
  postUserId: string;
}

const Comment = ({ comment, userId, postUserId }: Props) => {
  const commentUser = comment.userId;
  const link =
    commentUser?._id === userId ? "profile" : `/profile/${commentUser?._id}`;
  const router = useRouter();

  const handleReply = async () => {
    const res = await createChat({
      triggerUserId: userId,
      targetUserId: commentUser?._id,
    });
    if (res) {
      router.push(`/messages/${res?.chatId}`);
    }
  };
  return (
    <div className="bg-comment w-full p-6 rounded-md">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-x-6 items-center">
          <Link href={link} className="relative w-[35px] h-[35px]">
            <Image
              src={commentUser?.image!}
              alt="user"
              fill
              className="rounded-full object-cover"
            />
          </Link>
          <div className="flex flex-col gap-y-1">
            <Link
              href={link}
              className="text-lg text-neutral-800 font-semibold"
            >
              {commentUser?.username}
            </Link>
            <p className="text-gray-400 text-xs">{commentUser?.profession}</p>
          </div>
          {commentUser?._id === postUserId && (
            <span className="px-3 py-0.5 cursor-pointer bg-primary text-white text-sm rounded-full">
              Author
            </span>
          )}
        </div>
        <p className="text-gray-400 text-xs">
          {getTimeAgoString(comment?.createdAt)}
        </p>
      </div>
      <div className="py-4">
        <p className="text-neutral-700 text-sm">{comment?.comment}</p>
      </div>
      {userId !== commentUser?._id && (
        <div className="flex w-full justify-end">
          <p
            className="cursor-pointer text-gray-600 text-sm hover:text-neutral-700"
            onClick={handleReply}
          >
            Reply
          </p>
        </div>
      )}
    </div>
  );
};

export default Comment;
