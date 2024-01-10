import Image from "next/image";
import React from "react";
import NotFoundImg from "@/../public/svgs/undraw_taken_img.svg";

function NotFound() {
  return (
    <div className="my-16 flex flex-col items-center gap-12">
      <div className="text-center drop-shadow-md">
        <h4 className="mb-2 text-3xl font-bold">Not Found</h4>
        <p className="text-muted-foreground">Such page doesnt exist!</p>
      </div>

      <Image
        src={NotFoundImg}
        alt="Not found"
        role="presentation"
        width={140}
        height={140}
      />
    </div>
  );
}

export default NotFound;
