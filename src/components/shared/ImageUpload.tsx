"use client";

import { useDropzone } from "@uploadthing/react";
import { ImageUp } from "lucide-react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "../ui/button";

type Props = {
  images: File[] | [];
  setImages: Dispatch<SetStateAction<File[]>>;
};
const ImageUpload = ({ images, setImages }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages(acceptedFiles);
  }, []);
  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-[0.8] p-2 rounded-md border border-dotted border-primary bg-primary/40 items-center justify-center"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      <div className="flex items-center flex-col gap-y-4 text-grey-500">
        <ImageUp size={24} className="text-primary/80" />
        <div className="flex gap-x-6">
          <Button type="button" className="rounded-full h-[20px] p-4">
            Select from computer
          </Button>
          {images.length > 0 && (
            <Button
              type="button"
              className="rounded-full h-[20px] p-4 bg-red-400 hover:bg-red-300"
              onClick={() => setImages([])}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
