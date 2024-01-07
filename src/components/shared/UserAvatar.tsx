import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { placeholders } from "../../../constant/data";

interface Props {
  username?: string;
  userImage: string;
  size: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-10 h-10",
  md: "w-24 h-24",
  lg: "w-32 h-32",
};

function UserAvatar({ userImage, size }: Props) {
  return (
    <Avatar
      className={`${size && sizes[size]} border-2 bg-background shadow-md`}
    >
      <AvatarImage
        className="object-contain object-center"
        src={userImage ? userImage : placeholders.profilePicturePlaceholder}
      />
    </Avatar>
  );
}

export default UserAvatar;
