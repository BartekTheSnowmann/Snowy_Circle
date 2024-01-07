import React from "react";
import { getPosts } from "./actions";
import Post from "@/components/shared/Post";

async function Postslist({ q }: { q: string }) {
  const { foundPosts } = await getPosts(q);

  if (!foundPosts?.length || foundPosts == undefined) {
    return (
      <div className="m-4">
        <p>Found 0 posts</p>
      </div>
    );
  }

  return (
    <div className="m-4">
      <div>
        <p>
          Found {foundPosts.length} {foundPosts.length > 1 ? "posts" : "post"}
        </p>
        <div className="separator mb-4 mt-2" />
      </div>
      <div className="flex flex-col gap-16">
        {foundPosts.map((post) => (
          <Post
            key={`search_result-${post.id}`}
            post={post}
            image={post.User.image!}
            username={post.User.username}
          />
        ))}
      </div>
    </div>
  );
}

export default Postslist;
