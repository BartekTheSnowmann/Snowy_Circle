import Image from "next/image";
import React from "react";
import HappyMusicSvg from "@/../public/svgs/happyMusic.svg";

function NoMorePosts() {
  return (
    <div className="flex items-center justify-center px-4 py-16">
      <div>
        <div className="mb-8 text-center drop-shadow-md">
          <h4 className="mb-2 text-xl font-bold">Thats all!</h4>
          <p className="max-w-sm text-muted-foreground">
            Maybe you are scrolling too much...
          </p>
        </div>
        <Image
          src={HappyMusicSvg}
          alt="No more posts"
          height={300}
          width={300}
        />
      </div>
    </div>
  );
}

export default NoMorePosts;
