"use client";

import { ChatBubbleIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import LikeBtn from "../interactions/LikeBtn";
import CommentPost from "../interactions/CommentPost";
import Comment from "../interactions/Comment";
import { hasUserLiked } from "@/lib/actions/interactions/actions";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { CommentWithUser } from "@/lib/types";
import { AnimatePresence } from "framer-motion";

interface Props {
  postId: string;
  showInteractions?: boolean;
  postComments: [];
  // or TComment
  likes?: string[];
}

function PostInteractions({
  postId,
  showInteractions,
  postComments: comments,
  likes,
}: Props) {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);

  const checkIfLiked = async () => {
    const data = await hasUserLiked(postId);
    return data;
  };

  useEffect(() => {
    checkIfLiked().then((res) => setIsLiked(res));
  }, [postId, isLiked]);

  const likesAmount = likes?.length ?? 0;
  const commentsAmount = comments?.length ?? 0;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        {isLiked !== null ? (
          <>
            <LikeBtn
              likesAmount={likesAmount}
              isLiked={isLiked}
              postId={postId}
            />
            <Link href={`/post/${postId}`}>
              <Button className="flex items-center gap-2" variant={"outline"}>
                {commentsAmount > 0 && commentsAmount}
                <ChatBubbleIcon className="h-6 w-6" />
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex w-full justify-between">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        )}
      </div>

      {showInteractions && (
        <div className="mt-4 border-t-2 border-muted">
          <AnimatePresence>
            {comments.length > 0 &&
              comments.map((comment: CommentWithUser) => (
                <Comment key={comment.id} comment={comment} />
              ))}
          </AnimatePresence>
          <CommentPost postId={postId} />
        </div>
      )}
    </div>
  );
}

export default PostInteractions;
