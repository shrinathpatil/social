"use client";

import { commentPost } from "@/actions/comment.action";
import { CommentParams, IComment, IUser } from "@/types";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface Props {
  postId: string;
  triggerUser: IUser;
  targetUserId: string;
  addComment: Dispatch<SetStateAction<IComment[]>>;
}

const AddComment = ({
  postId,
  triggerUser,
  targetUserId,
  addComment,
}: Props) => {
  const [comment, setComment] = useState<string>("");

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!comment) {
      toast.warning("Type something to comment!");
      return;
    }
    try {
      const newComment: CommentParams = {
        comment,
        postId,
        targetUserId,
        triggerUserId: triggerUser._id,
      };

      const res = await commentPost(newComment);
      if (res) {
        addComment((prev) => [...prev, res]);
        toast.success("Commented successfully!");
      } else {
        toast.error("Failed to comment!");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form onSubmit={handleComment} className="flex items-center gap-x-6 w-full">
      <div className="relative w-[35px] h-[35px]">
        <Image
          src={triggerUser?.image!}
          alt="avatar"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <input
        type="text"
        className="bg-transparent text-gray-500 text-sm px-4 py-2 outline-none border border-gray-200 w-full rounded-md"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="what do you think here..."
      />
    </form>
  );
};

export default AddComment;
