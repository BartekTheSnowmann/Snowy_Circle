"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useTransition } from "react";
import { followUser } from "./actions";
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons";

interface Props {
  username: string;
  isFollowed: boolean;
}

function FollowUserBtn({ username, isFollowed }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className="rounded-l-none"
      onClick={() =>
        startTransition(async () => {
          await followUser(username);
        })
      }
    >
      {isFollowed ? (
        <>
          Followed <CheckIcon className="h-6 w-6" />
        </>
      ) : (
        <>
          Follow <PlusIcon className="h-6 w-6" />
        </>
      )}
    </Button>
  );
}

function propsAreEqual(prevProps: Props, nextProps: Props) {
  return (
    prevProps.username === nextProps.username &&
    prevProps.isFollowed === nextProps.isFollowed
  );
}

export default React.memo(FollowUserBtn, propsAreEqual);
