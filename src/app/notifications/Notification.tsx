"use client";

import React, { useEffect, useTransition } from "react";
import { deleteNotification, markAsRead } from "./actions";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import UserAvatar from "@/components/shared/UserAvatar";
import Link from "next/link";
import { TExtendedNotification } from "@/lib/types";

function Notification({
  notification,
}: {
  notification: TExtendedNotification;
}) {
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    markAsRead(notification.id);
  }, [notification]);

  return (
    <div
      className={`${
        !notification.read && "bg-primary"
      } bg-primary-foreground p-4`}
    >
      <div className="flex flex-col items-start gap-4">
        <div className="flex w-full justify-between">
          <UserAvatar size="sm" userImage={notification.actionUser.image!} />
          <Button
            size={"icon"}
            className="bg-destructive"
            onClick={() =>
              startTransition(async () => {
                await deleteNotification(notification.id);
              })
            }
          >
            <TrashIcon className="h-6 w-6" />
          </Button>
        </div>

        <Link
          href={
            notification.type === "follow"
              ? `/user/${notification.actionUser.username}`
              : `/post/${notification?.post?.id}`
          }
        >
          <p className="flex-1">{notification?.body}</p>
        </Link>
      </div>
    </div>
  );
}

export default Notification;
