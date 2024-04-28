"use client";
import { getPostComments } from "@/actions/comment.action";
import { likePost } from "@/actions/user.action";
import { cn } from "@/lib/utils";
import { IComment, IUser } from "@/types";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddComment from "./AddComment";
import Comment from "./Comment";

interface Props {
  user: IUser;
  postId: string;
  targetUserId: string;
  postUserId: string;
}

const ShowComments = ({ postId, postUserId, user, targetUserId }: Props) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const getComments = async () => {
      const result: IComment[] = await getPostComments(postId);
      setComments(result);
    };
    showComments && getComments();
  }, [postId, showComments]);

  const handleLike = async () => {
    const res = await likePost({
      userId: user._id,
      ownerId: targetUserId,
      postId,
      path: "/",
    });
    if (res) {
      toast.success(res.message);
    } else {
      toast.error("somethine went wrong!");
    }
  };

  const isLiked = (): boolean => {
    //@ts-ignore
    if (user?.likedPosts?.includes(postId)) {
      return true;
    }
    return false;
  };
  return (
    <div className="flex flex-col gap-y-4 py-8 w-full">
      <div className="flex w-full justify-between items-center py-4 px-2">
        <div
          className="flex items-center gap-x-4 text-gray-400 hover:text-neutral-800 cursor-pointer"
          onClick={() => setShowComments((state) => !state)}
        >
          <MessageCircle
            size={20}
            className="text-gray-400 hover:text-neutral-800"
          />
          <span className="text-sm">Comment</span>
        </div>
        <ThumbsUp
          size={22}
          className={cn(
            "text-gray-400 hover:text-primary hover:fill-primary transition cursor-pointer",
            isLiked() && "fill-primary text-primary"
          )}
          onClick={handleLike}
        />
      </div>

      {showComments && (
        <>
          <AddComment
            postId={postId}
            triggerUser={user}
            targetUserId={targetUserId}
            addComment={setComments}
          />
          <div className="mt-4 flex flex-col gap-y-6 p-3 max-h-[600px] overflow-y-auto">
            {comments.length > 0 &&
              comments.map((comment) => (
                <Comment
                  comment={comment}
                  key={comment?._id}
                  postUserId={postUserId}
                  userId={user?._id}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowComments;
