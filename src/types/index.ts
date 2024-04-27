import { Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  image?: string;
  coverImage?: string;
  profession?: string;
  posts: string[] | IPost[];
  savedPosts: string[] | IPost[];
  likedPosts: string[] | IPost[];
  followers: string[] | IUser[];
  following: string[] | IUser[];
  notifications: string[] | INotification[];
}

export interface IPost extends Document {
  userId: IUser;
  images: string[];
  description: string;
  comments: IComment[];
  createdAt: Date;
}

export interface IComment extends Document {
  userId: IUser;
  postId: IPost;
  comment: string;
  createdAt: Date;
}

export interface IChat extends Document {
  chatId: string;
  members: IUser[];
  messages: IMessages[];
  createdAt: Date;
}

export interface INotification extends Document {
  notificationType: "like" | "comment" | "follow";
  triggerUserId: IUser;
  targetUserId: IUser;
  createdAt: Date;
}

export interface IMessages extends Document {
  chatId: string;
  senderId: IUser;
  receiverId: IUser;
  message: string;
  createdAt: Date;
}

export type CreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  image: string;
};

export type UpdateUserParams = {
  clerkId: string;
  username?: string;
  email?: string;
  image?: string;
  coverImage?: string;
  profession?: string;
};

export type CreatePostParams = {
  userId: string;
  images?: string[];
  description: string;
};
export type EditPostParams = {
  postId: string;
  description: string;
  images: string[];
};

export type LikePostParams = {
  userId: string;
  ownerId: string;
  postId: string;
  path: string;
};

export type CommentParams = {
  triggerUserId: string;
  targetUserId: string;
  postId: string;
  comment: string;
};

export type SavePostParams = {
  userId: string;
  postId: string;
  path: string;
};

export type FollowUserParams = {
  triggerUserId: string;
  targetUserId: string;
};
export type UnfollowUserParams = {
  triggerUserId: string;
  targetUserId: string;
};

export type CreateChatParams = {
  triggerUserId: string;
  targetUserId: string;
};

export type CreateMessageParams = {
  chatId: string;
  senderId: string;
  message: string;
};

export type ChatObject = {
  id: string;
  chatId: string;
  userId: string;
};
export type NotificationType = "like" | "comment" | "follow";
