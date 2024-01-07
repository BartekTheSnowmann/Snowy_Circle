"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { likePost } from "@/lib/actions/interactions/actions";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

interface Props {
  postId: string;
  isLiked: boolean;
  likesAmount: number;
}

function LikeBtn({ postId, isLiked, likesAmount }: Props) {
  const [pending, startTransition] = useTransition();
  const [liked, setLiked] = useState<boolean>(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleLikeClick = async () => {
    startTransition(async () => {
      const result = await likePost(postId);
      if (result.success === false) {
        toast.warning(result.message);
      } else {
        setLiked((prevLiked) => !prevLiked);
      }
    });
  };

  return (
    <Button
      className="flex items-center gap-2"
      variant={"outline"}
      onClick={handleLikeClick}
    >
      {likesAmount > 0 && likesAmount}
      {liked ? (
        <HeartFilledIcon className="h-6 w-6" />
      ) : (
        <HeartIcon className="h-6 w-6" />
      )}
    </Button>
  );
}

export default React.memo(LikeBtn);