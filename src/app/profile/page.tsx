import React from "react";
import { getProfile } from "../user/[username]/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { notFound, redirect } from "next/navigation";
import UserBanner from "./UserBanner";
import UserPosts from "@/components/shared/UserPosts";
import CreatePost from "@/components/CreatePostForm";
import UserBio from "@/components/shared/UserBio";

async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  const { foundUser } = await getProfile(undefined, session?.user.id);

  if (!foundUser) {
    return notFound();
  }

  return (
    <section>
      <UserBanner isProfile={true} user={foundUser} />
      <div className="mt-8 px-4">
        <UserBio isProfile bio={foundUser.bio} />
        <CreatePost />
        <div className="my-12">
          <h4 className="my-4 font-semibold">Posts</h4>
          <UserPosts canEdit user={foundUser} />
        </div>
      </div>
    </section>
  );
}

export default page;
