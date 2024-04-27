"use client";

import { updateUser } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUploadThing } from "@/lib/utils";
import { editPostSchema } from "@/lib/validations";
import { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, ImageUp, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const EditForm = ({ user }: { user: IUser }) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const form = useForm<z.infer<typeof editPostSchema>>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      username: "",
      profession: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof editPostSchema>) => {
    if (!values.username && !values.profession && !avatar && !cover) {
      toast.warning("Please add something to update!");
      return;
    }
    try {
      let avatarUrl = "";
      let coverUrl = "";
      if (avatar) {
        const uploads = await startUpload([avatar]);
        avatarUrl = uploads?.[0].url!;
      }
      if (cover) {
        const upload = await startUpload([cover]);
        coverUrl = upload?.[0]?.url!;
      }

      let userData: any = {};
      if (values?.username) {
        userData.username = values.username;
      }
      if (values?.profession) {
        userData.profession = values.profession;
      }
      if (avatar) {
        userData.image = avatarUrl;
      }
      if (cover) {
        userData.coverImage = coverUrl;
      }
      const res = await updateUser({ ...userData, clerkId: user.clerkId });
      if (res) {
        toast.success("Profile updated successfully!");
        form.reset();
        setAvatar(null);
        setCover(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 items-start p-4 w-full"
      >
        {!avatar && (
          <>
            <label
              htmlFor="avatar"
              className="outline-none w-full p-3 border border-dotted border-gray-400 bg-[#f0f3f8] flex justify-center items-center gap-x-4 rounded-md cursor-pointer"
            >
              <CloudUpload size={16} className="text-primary" />
              <p>choose a profile picture</p>
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setAvatar(e.target.files![0])}
              placeholder="choose a new profile picture"
            />
          </>
        )}
        {avatar && (
          <div className="relative rounded-full p-1 w-[100px] h-[100px] flex justify-center   bg-slate-200 ">
            <Image
              src={URL.createObjectURL(avatar)}
              alt="cover"
              width={100}
              height={100}
              className="rounded-full z-[4]"
            />
            <X
              size={16}
              className="absolute right-1.5 top-1.5 text-white cursor-pointer bg-red-400 z-[4] rounded-full"
              onClick={() => setAvatar(null)}
            />
          </div>
        )}

        {!cover && (
          <>
            <label
              htmlFor="cover"
              className="outline-none w-full p-3 border border-dotted border-gray-400 bg-[#f0f3f8] flex justify-center items-center gap-x-4 rounded-md cursor-pointer"
            >
              <ImageUp size={16} className="text-primary" />
              <p>choose a cover picture</p>
            </label>
            <input
              id="cover"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setCover(e.target.files![0])}
              placeholder="choose a new cover picture"
            />
          </>
        )}
        {cover && (
          <div className="relative  w-fit rounded-md h-full p-1 bg-slate-200 flex items-center justify-center z-[2]">
            <Image
              src={URL.createObjectURL(cover)}
              alt="cover"
              width={200}
              height={250}
              className="rounded-md z-[4]"
            />
            <X
              size={16}
              className="absolute right-1.5 top-1.5 text-white cursor-pointer bg-red-400 z-[4] rounded-full"
              onClick={() => setCover(null)}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Username"
                  className="w-full py-1.5 px-3 rounded-md bg-[#f0f3f8]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormControl>
                <Input
                  placeholder="Profession"
                  className="w-full py-1.5 px-3 rounded-md bg-[#f0f3f8]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={isUploading}
          type="submit"
          className="py-3 px-4 rounded-md"
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default EditForm;
