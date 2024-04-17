import {
  MobileNavbar,
  Navbar,
  ProfileCard,
  SuggestedFriendsCard,
} from "@/components/shared";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full min-h-screen text-black bg-background ">
      <Navbar />
      <div className="wrapper pt-8  flex gap-x-8">
        <ProfileCard />
        <div className="w-full h-screen bg-green-300">{children}</div>
        <SuggestedFriendsCard />
      </div>
      <MobileNavbar />
    </main>
  );
};

export default RootLayout;
