"use client";

import Image from "next/image";
import React from "react";
import UserInfo from "./UserInfo";
import PostInteractions from "./PostInteractions";
import DateBadge from "./DateBadge";
import DeletePostBtn from "../interactions/DeletePostBtn";
import { useSession } from "next-auth/react";
import { TPostWithComments } from "@/lib/types";

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
    <div className="flex flex-col border-2 p-4">
      <div>
        <div className="flex items-center justify-between">
          <UserInfo username={username} image={image} />
          <DateBadge createdAt={post.createdAt} />
        </div>

        {canEdit && (
          <div className="my-2 ml-auto w-fit">
            <DeletePostBtn postId={post.id} />
          </div>
        )}
      </div>

      <p className="my-2">{post.body}</p>

      {post.image && (
        <Image
          className="w-full"
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