"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const Tabs = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const isSaved = params.get("saved") === "true";
  const isSettings = params.get("settings") === "true";
  const isMyPosts = !isSaved && !isSettings;
  const showSaved = pathname.endsWith("profile");

  const handleTab = (tab: "posts" | "saved" | "settings") => {
    if (tab === "posts") {
      router.push(pathname, { scroll: false });
      return;
    }
    if (tab === "saved") {
      const query = qs.stringify(
        { saved: true, settings: null },
        { skipNull: true }
      );
      router.push(`?${query}`);
      return;
    }
    if (tab === "settings") {
      const query = qs.stringify(
        { settings: true, saved: null },
        { skipNull: true }
      );
      router.push(`?${query}`);
      return;
    }
  };

  return (
    <div className="flex  px-6  items-center gap-x-6 pb-5">
      <span
        onClick={() => handleTab("posts")}
        className={cn(
          "text-neutral-500 text-sm  cursor-pointer hover:text-neutral-800",
          isMyPosts && "text-neutral-800"
        )}
      >
        {showSaved ? "My Posts" : "Posts"}
      </span>
      {showSaved && (
        <span
          onClick={() => handleTab("saved")}
          className={cn(
            "text-neutral-500 text-sm  cursor-pointer hover:text-neutral-800",
            isSaved && "text-neutral-800"
          )}
        >
          Saved Posts
        </span>
      )}
      {showSaved && (
        <span
          onClick={() => handleTab("settings")}
          className={cn(
            "text-neutral-500 text-sm  cursor-pointer hover:text-neutral-800",
            isSettings && "text-neutral-800"
          )}
        >
          Settings
        </span>
      )}
    </div>
  );
};

export default Tabs;
