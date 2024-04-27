"use server";

import { connectToDb } from "@/database/connection";
import { Post, User } from "@/database/models";
import { CreatePostParams, EditPostParams, IPost } from "@/types";
import { revalidatePath } from "next/cache";

export const createPost = async (post: CreatePostParams) => {
  await connectToDb();
  try {
    const newPost = await Post.create(post);

    await User.findByIdAndUpdate(post.userId, {
      $addToSet: { posts: newPost._id },
    });

    console.log("post created successfully");

    revalidatePath("/");
    return JSON.parse(JSON.stringify(newPost));
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async () => {
  await connectToDb();
  try {
    const posts = await Post.find()
      .populate({
        path: "userId",
        model: User,
        select: "_id username email image profession",
      })
      .sort({ createdAt: "desc" })
      .limit(10);

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log(error);
  }
};

export const getMyPosts = async (userId: string) => {
  await connectToDb();
  try {
    const posts = await Post.find({ userId })
      .populate({
        path: "userId",
        model: User,
        select: "_id username email image profession",
      })
      .sort({ createdAt: "desc" });

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log(error);
  }
};

export const getSavedPosts = async (userId: string) => {
  await connectToDb();
  try {
    const posts = await User.findById(userId).populate({
      path: "savedPosts",
      model: Post,
      populate: {
        path: "userId",
        model: User,
        select: "_id username image profession email",
      },
    });

    return JSON.parse(JSON.stringify(posts?.savedPosts));
  } catch (error) {
    console.log(error);
  }
};

export const getLikedPosts = async (userId: string) => {
  await connectToDb();
  try {
    const liked = await User.findById(userId).populate({
      path: "likedPosts",
      model: Post,
      populate: {
        path: "userId",
        model: User,
        select: "_id username image profession email",
      },
    });

    return JSON.parse(JSON.stringify(liked?.likedPosts));
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId: string) => {
  await connectToDb();
  try {
    await Post.findByIdAndDelete(postId);
    revalidatePath("/");
    revalidatePath("/profile");
    return { message: "post deleted!" };
  } catch (error) {
    console.log(error);
  }
};

export const editPost = async ({
  postId,
  description,
  images,
}: EditPostParams) => {
  await connectToDb();
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { description, images },
      { new: true }
    );

    revalidatePath("/");
    revalidatePath("/profile");

    return { message: "post updated!" };
  } catch (error) {
    console.log(error);
  }
};
