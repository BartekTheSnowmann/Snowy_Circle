import React from "react";

interface Props {
  bio?: string | null;
  isProfile?: boolean;
}

function UserBio({ bio, isProfile }: Props) {
  if (isProfile) {
    return (
      <p className="mx-auto max-w-md text-center text-sm text-muted-foreground">
        {bio ? bio : "..."}
      </p>
    );
  }

  return (
    <p className="mx-auto max-w-md text-center text-sm">{bio ? bio : ""}</p>
  );
}

export default UserBio;
