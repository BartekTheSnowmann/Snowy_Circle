import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getDiscoverFeed } from "@/lib/actions/feed/actions";
import { getServerSession } from "next-auth";
import React from "react";
import Post from "./Post";
import LoadMore from "../LoadMore";

async function DiscoverFeed() {
  let perPage = 12;
  let page = 1;
  const session = await getServerSession(authOptions);
  const postsData = await getDiscoverFeed(
    session?.user?.id || undefined,
    perPage,
    page,
  );
  if (!postsData.success) {
    return postsData.message;
  }

  return (
    <div className="m-8">
      <div className="flex flex-col gap-8">
        {postsData.posts.map((post) => (
          <Post
            key={post.id}
            image={post.User.image!}
            username={post.User.username}
            post={post}
          />
        ))}

        <LoadMore
          session={session || undefined}
          perPage={perPage}
          feedType="discover"
        />
      </div>
    </div>
  );
}

export default DiscoverFeed;
