"use client";

import { cn } from "@/lib/utils";
import { IUser } from "@/types";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import EditForm from "./EditForm";

const Settings = ({ user }: { user: IUser }) => {
  const [activeTab, setActiveTab] = useState<"General" | "Logout">("General");
  const { signOut } = useClerk();
  const router = useRouter();
  const handleTab = (tab: "General" | "Logout") => {
    if (tab === "Logout") {
      signOut(() => router.push("/sign-in"));
      toast.success("You have been logged out!");
      return;
    }
    setActiveTab(tab);
  };
  return (
    <div className="w-full bg-white rounded-md shadow-md border border-gray-200 my-6">
      <h2 className="text-lg text-neutral-700 font-semibold w-full border-b border-gray-200 py-2 px-4">
        Settings
      </h2>
      <div className="flex w-full ">
        <div className="flex-[0.25] flex flex-col border-r border-gray-200 items-center">
          <span
            onClick={() => handleTab("General")}
            className={cn(
              "text-neutral-800 transition text-lg cursor-pointer hover:bg-[#f0f3f8]  px-3 py-1 w-full",
              activeTab === "General" && "bg-[#f0f3f8]"
            )}
          >
            General
          </span>
          <span
            onClick={() => handleTab("Logout")}
            className={cn(
              "text-neutral-800 transition text-lg cursor-pointer hover:bg-[#f0f3f8]  px-3 py-1 w-full",
              activeTab === "Logout" && "bg-[#f0f3f8]"
            )}
          >
            Logout
          </span>
        </div>

        <div className="flex-[0.75] p-6">
          <EditForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
