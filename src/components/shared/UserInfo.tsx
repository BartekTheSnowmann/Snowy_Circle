import React from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

interface Props {
  username: string;
  image: string;
}

function UserInfo({ username, image }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/user/${username}`}>
        <UserAvatar size="sm" userImage={image} username={username} />
      </Link>
      <p className="">{username}</p>
    </div>
  );
}

export default UserInfo;
