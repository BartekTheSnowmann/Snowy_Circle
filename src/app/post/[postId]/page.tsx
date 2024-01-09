import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Post from "@/components/shared/Post";
import { getPost } from "@/lib/actions/posts/actions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function page({ params: { postId } }: { params: { postId: string } }) {
  const { foundPost } = await getPost(postId);
  const session = await getServerSession(authOptions);

  if (!foundPost) {
    return notFound();
  }

  return (
    <div className="m-4">
      <Post
        canEdit={session?.user.id == foundPost.User.id}
        showInteractions
        post={foundPost}
        image={foundPost?.User.image!}
        username={foundPost?.User.username}
      />
    </div>
  );
}

export default page;
