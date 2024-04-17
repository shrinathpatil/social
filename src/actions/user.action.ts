"use server";

import { connectToDb } from "@/database/connection";
import { User } from "@/database/models";

export const getUser = async (clerkId: string) => {
  await connectToDb();
  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      console.log("user not found!");
    }

    return user;
  } catch (error) {}
};
