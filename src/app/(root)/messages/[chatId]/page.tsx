import { getUser, getUserChats } from "@/actions/user.action";
import { Chat, ChatBox, NewMessage, SendMessage } from "@/components/shared";
import { getSession } from "@/hooks/getSession";
import { IUser } from "@/types";
import { MessageCircleOff, SquarePen } from "lucide-react";

type ChatType = { chatId: string; friend: IUser; message?: string };

const MessageBox = async ({
  params: { chatId },
}: {
  params: { chatId: string };
}) => {
  const { userId } = getSession();
  const user = await getUser(userId);
  const chats: ChatType[] = await getUserChats(userId);
  return (
    <div className="w-full bg-white rounded-md border border-gray-200 shadow-md">
      <h1 className="text-neutral-800 text-lg font-semibold w-full px-6 py-3 border-b border-gray-200">
        Messages
      </h1>
      <div className="flex w-full h-[480px] ">
        <div className=" max-md:hidden flex-[0.25] max-md:flex-[1] max-md:border-r-0 flex flex-col items-center border-r border-gray-200  overflow-y-auto">
          {chats?.length > 0 ? (
            <ul className=" h-[460px] w-full overflow-y-auto flex flex-col">
              {chats.map((chat) => {
                const isActive = chatId === chat.chatId;
                return (
                  <Chat key={chat?.chatId} chat={chat} isActive={isActive} />
                );
              })}
            </ul>
          ) : (
            <p className="p-4 h-[460px] text-primary text-lg flex gap-x-4 items-center">
              <MessageCircleOff size={20} /> No Chats Created!
            </p>
          )}

          <NewMessage user={user}>
            <div className="flex w-full justify-center py-4 border-t border-gray-200 justify-self-end items-center gap-x-4 text-neutral-500 transition cursor-pointer hover:text-neutral-800">
              <SquarePen size={24} />
              <p className="">New Message</p>
            </div>
          </NewMessage>
        </div>
        <div className="flex-[0.75] flex flex-col w-full items-center max-md:flex-[1]">
          <ChatBox user={user} />
          <SendMessage user={user} />
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
