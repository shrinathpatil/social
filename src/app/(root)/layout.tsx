import {
  MobileNavbar,
  Navbar,
  ProfileCard,
  SuggestedFriendsCard,
} from "@/components/shared";
import { getSession } from "@/hooks/getSession";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const { userId } = getSession();
  return (
    <main className="w-full  text-black bg-background min-h-screen">
      <Navbar />
      <div className="wrapper pt-8  flex gap-x-8 h-screen">
        <ProfileCard />
        <div className="w-full h-screen ">{children}</div>
        <SuggestedFriendsCard userId={userId} />
      </div>
      <MobileNavbar userId={userId} />
    </main>
  );
};

export default RootLayout;
