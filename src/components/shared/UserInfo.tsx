import React from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

interface Props {
  username: string;
  image: string;
  size?: "sm" | "md" | "lg";
}

function UserInfo({ username, image, size }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/user/${username}`}>
        <UserAvatar
          size={size ? size : "sm"}
          userImage={image}
          username={username}
        />
      </Link>
      <p className="font-medium text-muted-foreground">{username}</p>
    </div>
  );
}

export default UserInfo;
