import { TSelectedUser, getUserPosts } from "@/app/user/[username]/actions";
import React from "react";
import Post from "./Post";
import LoadMore from "../LoadMore";

interface Props {
  user: TSelectedUser;
  canEdit?: boolean;
}

async function UserPosts({ user, canEdit }: Props) {
  let perPage = 12;
  let page = 1;

  const postsData = await getUserPosts(undefined, user.id, perPage, page);
  if (!postsData.posts) {
    return;
  }

  if (!postsData.posts.length) {
    return "No posts";
  }

  return (
    <div className="flex flex-col gap-16">
      {postsData?.posts.map((post) => (
        <Post
          canEdit={canEdit}
          username={post.User.username}
          image={post.User.image!}
          key={post.id}
          post={post}
        />
      ))}
      <LoadMore userId={user.id} perPage={perPage} feedType="user" />
    </div>
  );
}

export default UserPosts;