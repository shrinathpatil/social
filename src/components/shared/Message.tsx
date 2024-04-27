import { cn } from "@/lib/utils";
import { IUser } from "@/types";
import Image from "next/image";

interface Props {
  message: string;
  isSender: boolean;
  time: string;
  user: IUser;
}
//isSender ?currentUserId==senderId
const Message = ({ isSender, message, time, user }: Props) => {
  return (
    <div className={cn("", isSender ? "self-end" : "self-start")}>
      <div
        className={cn(
          "w-fit flex gap-x-2 ",
          isSender ? "justify-self-end " : "justify-self-start"
        )}
      >
        {!isSender && (
          <div className="relative w-[30px] h-[30px]">
            <Image
              src={user?.image!}
              fill
              alt="avatar"
              className="rounded-full object-cover"
            />
          </div>
        )}
        <div
          className={cn(
            "flex w-full flex-col gap-y-0.5 p-2",
            isSender
              ? "text-white bg-primary sender-message"
              : "text-neutral-700 bg-[#f0f3f8] receiver-message"
          )}
        >
          <p className={cn("text-sm")}>{message}</p>
          <p className="w-fit self-end text-[8px]">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
