"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { deletePost } from "@/lib/actions/posts/actions";

function DeletePostBtn({
  postId,
  commentId,
  isComment,
  isPost,
}: {
  postId?: string;
  isPost?: string;
  isComment?: boolean;
  commentId?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          if (isComment) {
            await deletePost(commentId!, "comment");
            return;
          }
          await deletePost(postId!, "post");
        })
      }
      className="m-0 bg-red-400 p-2 hover:bg-red-500"
      variant={"default"}
    >
      <TrashIcon className="h-6 w-6 rounded-full text-white" />
    </Button>
  );
}

export default DeletePostBtn;
