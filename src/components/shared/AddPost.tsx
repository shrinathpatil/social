"use client";
import { createPost } from "@/actions/post.action";
import { useUploadThing } from "@/lib/utils";
import { createPostSchema } from "@/lib/validations";
import { CreatePostParams, IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import ImageUpload from "./ImageUpload";
import ImagesDisplay from "./ImagesDisplay";

type Props = {
  user: IUser;
};
const AddPost = ({ user }: Props) => {
  const [images, setImages] = useState<File[]>([]);
  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      description: "",
    },
  });
  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const onSubmit = async (values: z.infer<typeof createPostSchema>) => {
    if (!values.description && images.length === 0) {
      toast.warning("Please add description or image to post!");
      return;
    }
    if (images.length > 10) {
      toast.warning("You can't upload more than 10 images!");
      return;
    }
    try {
      let imageUrls: string[] = [];
      if (images.length > 0) {
        const uploads = await startUpload(images);
        //@ts-ignore
        imageUrls = uploads?.map((upload) => upload.url);
      }

      const post: CreatePostParams = {
        userId: user._id,
        description: values.description,
        images: imageUrls,
      };

      const newPost = await createPost(post);
      if (newPost) {
        form.reset();
        setImages([]);
        toast.success("post created successfully!");
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white w-full rounded-md border border-gray-100 p-6 shadow-md"
      >
        <div className="flex items-center gap-x-6 w-full ">
          <Link href={"/profile"} className="relative h-[50px] w-[50px]">
            <Image
              src={user?.image!}
              alt="avatar"
              fill
              className="rounded-full object-cover"
            />
          </Link>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="what do you think ..."
                    className="bg-transparent border-t-0 border-l-0 border-r-0 border-b border-gray-200 w-full"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {images.length > 0 && (
          <div className="flex w-full justify-center">
            <ImagesDisplay images={images} />
          </div>
        )}
        <div className="flex items-center w-full gap-x-4">
          <ImageUpload images={images} setImages={setImages} />
          <Button
            type="submit"
            disabled={isUploading}
            className="rounded-full flex flex-[0.2]"
          >
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPost;
