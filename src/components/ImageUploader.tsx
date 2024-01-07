"use client";

import { UploadButton } from "@/lib/utils/uploadthing";
import Image from "next/image";
import { ImageIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

type ImageUploaderProps = {
  image: any;
  setImage: React.Dispatch<React.SetStateAction<any>>;
};

export default function ImageUploader({ image, setImage }: ImageUploaderProps) {
  return (
    <main>
      <div className="flex gap-2">
        {image && (
          <div className="relative">
            <Image
              className="aspect-square h-10 w-10 rounded-md"
              src={image}
              alt="Uploaded Image"
              width={200}
              height={200}
            />
            <Button
              onClick={() => setImage(undefined)}
              variant={"link"}
              className="absolute left-1/2 top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 p-0"
            >
              <Cross1Icon className="h-6 w-6 text-white" />
            </Button>
          </div>
        )}

        <UploadButton
          content={{
            button({ ready, isUploading, uploadProgress }) {
              return <ImageIcon className="h-6 w-6" />;
            },
          }}
          appearance={{
            button: "w-fit px-2",
            allowedContent: "hidden",
          }}
          className="custom-class"
          endpoint="imageUploader"
          onClientUploadComplete={(res: any) => {
            setImage(res[0].url);
            // console.log(res);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </main>
  );
}
