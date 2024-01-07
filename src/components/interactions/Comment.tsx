"use client";

import React from "react";
import UserInfo from "../shared/UserInfo";
import DateBadge from "../shared/DateBadge";
import { useSession } from "next-auth/react";
import DeletePostBtn from "./DeletePostBtn";
import { CommentWithUser } from "@/lib/types";

function Comment({ comment }: { comment: CommentWithUser }) {
  const { data: session } = useSession();
  const canEdit = session?.user?.id == comment.user.id;

  return (
    <div className="my-4 bg-primary/20 p-4">
      <div className="flex items-center justify-between">
        <UserInfo
          username={comment.user.username}
          image={comment.user.image!}
        />
        <DateBadge createdAt={comment.createdAt} />
      </div>
      {canEdit && (
        <div className="my-2 ml-auto w-fit">
          <DeletePostBtn isComment={true} commentId={comment.id} />
        </div>
      )}
      <div className="my-2">{comment.body}</div>
    </div>
  );
}

export default Comment;
