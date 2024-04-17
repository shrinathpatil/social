import { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";

export const metadata = (): Metadata => {
  return {
    title: "Social Authentication",
    description: "socail media applicationusing next.js and clerk.dev",
  };
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-background gap-y-4">
      <div className="w-full max-w-[400px] flex items-center justify-start gap-x-4">
        <Image
          src="/assets/icons/Logomark.svg"
          alt="logo"
          width={50}
          height={50}
        />
        <p className="text-3xl  text-primary font-semibold">Social</p>
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
