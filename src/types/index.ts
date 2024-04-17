import { Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  image?: string;
  coverImage?: string;
  profession?: string;
  posts: [string] | [IPost];
  savedPosts: [string] | [IPost];
  likedPosts: [string] | [IPost];
  followers: [string] | [IUser];
  following: [string] | [IUser];
  notifications: [string] | [INotification];
}

export interface IPost extends Document {
  userId: string | IUser;
  images: [string];
  descripiton: string;
  comments: [string] | [IComment];
}

export interface IComment extends Document {
  userId: string | IUser;
  postId: string | IPost;
  comment: string;
}

export interface INotification extends Document {
  notificationType: "like" | "comment" | "follow";
  userId: string | IUser;
}

export interface IMessages extends Document {
  userId: string | IUser;
  receiverId: string | IUser;
  message: string;
}

export type NotificationType = "like" | "comment" | "follow";
