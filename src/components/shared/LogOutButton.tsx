"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
const LogOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const handleLogOut = () => {
    signOut(() => router.push("/sign-in"));
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <LogOut
            size={28}
            className="text-red-400 cursor-pointer hover:text-red-500"
            onClick={handleLogOut}
          />
        </TooltipTrigger>
        <TooltipContent align="start" alignOffset={5}>
          <p>LogOut</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LogOutButton;
