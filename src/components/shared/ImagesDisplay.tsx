"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type Props = {
  images: File[] | string[];
};
const ImagesDisplay = ({ images }: Props) => {
  const imageUrls = images.map((image) => {
    if (typeof image === "string") {
      return image;
    }
    return URL.createObjectURL(image);
  });
  return (
    <Carousel className="flex w-[420px] justify-center items-center">
      <CarouselContent className="">
        {imageUrls.map((url) => (
          <CarouselItem key={url} className="">
            <Image
              src={url}
              alt="image"
              width={420}
              height={550}
              className="object-cover object-center"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImagesDisplay;
