"use client";

import React from "react";
import UserInfo from "../shared/UserInfo";
import DateBadge from "../shared/DateBadge";
import { useSession } from "next-auth/react";
import DeletePostBtn from "./DeletePostBtn";
import { CommentWithUser } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";

function Comment({ comment }: { comment: CommentWithUser }) {
  const { data: session } = useSession();
  const canEdit = session?.user?.id == comment.user.id;

  return (
    <motion.div
      key={comment.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      className="my-4 rounded-md bg-background p-4 shadow-md"
    >
      <div className="flex items-start justify-between">
        <UserInfo
          username={comment.user.username}
          image={comment.user.image!}
        />
        <div className="flex flex-col items-end gap-2">
          <DateBadge createdAt={comment.createdAt} />
          {canEdit && (
            <div className="my-2 ml-auto w-fit">
              <DeletePostBtn isComment={true} commentId={comment.id} />
            </div>
          )}
        </div>
      </div>

      <div className="my-2">{comment.body}</div>
    </motion.div>
  );
}

export default Comment;
