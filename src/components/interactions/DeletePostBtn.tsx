"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteComment, deletePost } from "@/lib/actions/posts/actions";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          if (isComment) {
            await deleteComment(commentId!, pathname);
            return;
          }
          await deletePost(postId!);
        })
      }
      size={"icon"}
      className="m-0 bg-destructive"
      variant={"default"}
    >
      <TrashIcon className="h-6 w-6 rounded-full text-white" />
    </Button>
  );
}

export default DeletePostBtn;
