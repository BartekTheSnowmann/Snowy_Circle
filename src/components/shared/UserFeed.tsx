import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getUserFeed } from "@/lib/actions/feed/actions";
import { getServerSession } from "next-auth";
import React from "react";
import Post from "./Post";
import NoSession from "../other/NoSession";
import LoadMore from "../LoadMore";
import NoMorePosts from "../other/NoMorePosts";

async function UserFeed() {
  let perPage = 12;
  let page = 1;

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <NoSession />;
  }

  const postsData = await getUserFeed(session.user.id, perPage, page);
  if (!postsData.success) {
    return <NoMorePosts />;
  }

  return (
    <div className="m-8">
      <div className="flex flex-col gap-8">
        {postsData.posts?.map((post) => (
          <Post
            key={post.id}
            image={post.User.image!}
            username={post.User.username}
            post={post}
          />
        ))}
        <LoadMore session={session} perPage={perPage} feedType="my-feed" />
      </div>
    </div>
  );
}

export default UserFeed;
