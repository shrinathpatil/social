"use client";
import { deleteNotification } from "@/actions/notification.actions";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface Props {
  id: string;
  userId: string;
}
const DeleteNotification = ({ id, userId }: Props) => {
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteNotification(id, userId);
      toast.success(res?.message);
    } catch (error) {
      toast.error("something went wrong!");
    }
  };
  return (
    <Trash
      size={16}
      className="text-red-400 hidden group-hover:flex hover:scale-105 cursor-pointer"
      onClick={() => handleDelete(id)}
    />
  );
};

export default DeleteNotification;
