import CreatePost from "@/components/CreatePostForm";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <CreatePost />;
    </>
  );
}

export default page;
