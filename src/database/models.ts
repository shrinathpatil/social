import { Schema, model, models } from "mongoose";
import { IUser } from "./../types/index";

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    profession: {
      type: String,
      default: "",
    },
    posts: {
      type: [Schema.Types.ObjectId],
      ref: "Post",
    },
    savedPosts: {
      type: [Schema.Types.ObjectId],
      ref: "Post",
    },
    likedPosts: {
      type: [Schema.Types.ObjectId],
      ref: "Post",
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    following: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    notifications: {
      type: [Schema.Types.ObjectId],
      ref: "Notification",
    },
  },
  { timestamps: true }
);

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    images: {
      type: [String],
      default: [],
    },
    descripiton: {
      type: String,
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const notificationSchema = new Schema(
  {
    notificationType: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = models.User || model("User", userSchema);
export const Post = models.Post || model("Post", postSchema);
export const Comment = models.Comment || model("Comment", commentSchema);
export const Notification =
  models.Notification || model("Notification", notificationSchema);
export const Message = models.Message || model("Message", messageSchema);
