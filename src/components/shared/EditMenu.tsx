"use client";

import { deletePost } from "@/actions/post.action";
import { savePost } from "@/actions/user.action";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IUser } from "@/types";
import { BookMarked, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  user: IUser;
  postId: string;
  ownerId: string;
}

const EditMenu = ({ ownerId, postId, user }: Props) => {
  const handleDelete = async () => {
    const res = await deletePost(postId);
    if (res) {
      toast.success(res.message);
    } else {
      toast.error("something went wrong!");
    }
  };

  const handleSave = async () => {
    const res = await savePost({ userId: user._id, postId, path: "/" });

    if (res) {
      toast.success(res.message);
    } else {
      toast.error("something went wrong!");
    }
  };

  const isSaved = (): boolean => {
    //@ts-ignore
    if (user?.savedPosts.includes(postId)) {
      return true;
    }
    return false;
  };

  return (
    <div className="w-fit">
      <Popover>
        <PopoverTrigger asChild className="cursor-pointer">
          <Ellipsis size={24} className="text-neutral-600" />
        </PopoverTrigger>
        <PopoverContent className="bg-white border border-gray-200 rounded-md p-4 w-fit ">
          <ul className="flex flex-col gap-y-2.5">
            {ownerId === user?._id && (
              <li className="flex items-center gap-x-2 cursor-pointer text-sm text-neutral-700 hover:text-primary">
                Edit{" "}
                <Pencil
                  size={16}
                  className="text-neutral-700 hover:text-primary"
                />
              </li>
            )}
            {ownerId === user?._id && (
              <li
                className="text-sm flex items-center gap-x-2 hover:text-red-400 cursor-pointer"
                onClick={handleDelete}
              >
                Delete{" "}
                <Trash2
                  size={16}
                  className="text-neutral-700 hover:text-red-400"
                />
              </li>
            )}
            <li
              className="flex text-sm  items-center gap-x-2 text-neutral-700 hover:text-primary cursor-pointer"
              onClick={handleSave}
            >
              {isSaved() ? "Unsave" : "Save"}
              <BookMarked
                size={16}
                className="text-neutral-700 hover:text-primary"
              />{" "}
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EditMenu;
