import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

export const getTimeAgoString = (date: Date) => {
  const ans = formatDistanceToNow(date, { addSuffix: true });
  return ans;
};
