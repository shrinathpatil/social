import { Loader } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social",
  description: "socail media applicationusing next.js and clerk.dev",
  icons: {
    icon: "/assets/icons/Logomark.svg",
  },
};

const loading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Loader />
    </div>
  );
};

export default loading;
