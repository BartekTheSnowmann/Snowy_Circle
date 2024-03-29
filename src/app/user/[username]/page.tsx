import React from "react";
import { notFound, redirect } from "next/navigation";
import UserBanner from "@/app/profile/UserBanner";
import UserPosts from "@/components/shared/UserPosts";
import { getProfile, isFollowing } from "./actions";
import FollowUserBtn from "./FollowUserBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { placeholders } from "../../../../constant/data";

interface Props {
  params: {
    username: string;
  };
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const { foundUser } = await getProfile(username);

  return {
    title: foundUser?.username || "user",
    openGraph: {
      images: [foundUser?.image || placeholders.profilePicturePlaceholder],
    },
  };
}

async function page({ params: { username } }: Props) {
  const { foundUser } = await getProfile(username);
  const session = await getServerSession(authOptions);

  if (session?.user.id === foundUser?.id) {
    redirect("/profile");
  }

  if (!foundUser) {
    return notFound();
  }

  const isFollowed = await isFollowing(username);

  return (
    <section>
      <UserBanner isProfile={false} user={foundUser} />

      <div className="m-8 flex items-center justify-end">
        <Button asChild variant={"outline"} className="rounded-r-none">
          <Link
            className="flex items-center gap-2"
            href={`/user/${foundUser.username}/followings`}
          >
            <PersonIcon className="h-6 w-6" />
            Followings
          </Link>
        </Button>
        {session?.user ? (
          <div className="w-fit">
            <FollowUserBtn isFollowed={isFollowed} username={username} />
          </div>
        ) : (
          <Link href={"/api/auth/signin"}>
            <div className="w-fit">
              <FollowUserBtn isFollowed={isFollowed} username={username} />
            </div>
          </Link>
        )}
      </div>

      <div>
        <h4 className="mx-8 mt-8 font-semibold">Posts</h4>
        <UserPosts canEdit user={foundUser} />
      </div>
    </section>
  );
}

export default page;
