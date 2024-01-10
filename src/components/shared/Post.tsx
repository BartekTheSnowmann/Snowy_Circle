"use client";

import Image from "next/image";
import React from "react";
import UserInfo from "./UserInfo";
import PostInteractions from "./PostInteractions";
import DateBadge from "./DateBadge";
import DeletePostBtn from "../interactions/DeletePostBtn";
import { useSession } from "next-auth/react";
import { TPostWithComments } from "@/lib/types";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

interface Props {
  post: TPostWithComments;
  image: string;
  username: string;
  showInteractions?: boolean;
  canEdit?: boolean;
}

function Post({ post, image, username, showInteractions, canEdit }: Props) {
  const { data: session } = useSession();
  canEdit = session?.user.id === post.userId;

  return (
    <div className="m-4 mx-auto flex w-full flex-col rounded-md bg-primary-foreground p-4 shadow-md">
      <div>
        <div className="flex items-start justify-between">
          <UserInfo username={username} image={image} />
          <div className="flex flex-col items-end gap-2">
            <DateBadge createdAt={post.createdAt} />
            {canEdit && (
              <div>
                {/* <DotsVerticalIcon className="h-6 w-6" /> */}
                <DeletePostBtn postId={post.id} />
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="my-4">{post.body}</p>

      {post.image && (
        <Image
          className="w-full border-2 border-muted"
          src={post.image}
          alt="post image"
          width={300}
          height={300}
        />
      )}

      <div className="my-2">
        <PostInteractions
          showInteractions={showInteractions}
          postComments={post.comments}
          likes={post.likedIds}
          postId={post.id}
        />
      </div>
    </div>
  );
}

export default Post;
