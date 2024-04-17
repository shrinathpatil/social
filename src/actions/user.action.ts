"use server";

import { connectToDb } from "@/database/connection";
import { User } from "@/database/models";
import { CreateUserParams } from "@/types";

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

export const createUser = async (user: CreateUserParams) => {
  await connectToDb();
  try {
    const newUser = await User.create(user);

    console.log("new user created!");
    return newUser;
  } catch (error) {
    console.log(error);
  }
};
