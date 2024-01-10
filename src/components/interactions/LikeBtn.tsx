"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { likePost } from "@/lib/actions/interactions/actions";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
  isLiked: boolean;
  likesAmount: number;
}

function LikeBtn({ postId, isLiked, likesAmount }: Props) {
  const [pending, startTransition] = useTransition();
  const [liked, setLiked] = useState<boolean>(isLiked);
  const router = useRouter();

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleLikeClick = async () => {
    startTransition(async () => {
      const result = await likePost(postId);
      if (result.success === false) {
        router.push("/sign-in");
      } else {
        setLiked((prevLiked) => !prevLiked);
      }
    });
  };

  return (
    <Button
      className="group flex items-center gap-2"
      variant={"outline"}
      onClick={handleLikeClick}
    >
      {likesAmount > 0 && likesAmount}
      {liked ? (
        <HeartFilledIcon className="h-6 w-6 text-destructive" />
      ) : (
        <HeartIcon className="h-6 w-6 group-hover:text-destructive" />
      )}
    </Button>
  );
}

export default React.memo(LikeBtn);
