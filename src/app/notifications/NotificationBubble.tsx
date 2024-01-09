"use client";

import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getUserNotifications } from "./actions";
import { TExtendedNotification } from "@/lib/types";

let countReads = 0;

function NotificationBubble({ session }: { session: Session }) {
  const [notifications, setNotifications] = useState<TExtendedNotification[]>();
  const handleGetNotifications = async () => {
    const notifications = await getUserNotifications(session.user.id);
    countReads = notifications.reduce((count, item) => {
      if (item.read === false) {
        return count + 1;
      }
      return count;
    }, 0);

    return notifications;
  };

  useEffect(() => {
    handleGetNotifications().then((res) => setNotifications(res));

    const interval = setInterval(async () => {
      const updatedNotifications = await handleGetNotifications();
      setNotifications(updatedNotifications);
    }, 3000);

    return () => clearInterval(interval);
  }, [session.user.id]);

  return (
    <>
      <Link
        key={`userlink-notifications`}
        className="relative hidden items-center gap-2 font-medium capitalize duration-300 hover:text-primaryForeground md:flex"
        href={"/notifications"}
      >
        <EnvelopeClosedIcon className="h-4 w-4" />
        Notifications
      </Link>
      <Link
        key={`mobile_userlink-notifications`}
        className="relative items-center gap-2 font-medium capitalize duration-300 hover:text-primaryForeground md:hidden"
        href={"/notifications"}
      >
        <div className="absolute -left-2 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white shadow-md">
          <span className="text-sm font-light">{countReads}</span>
        </div>
        <EnvelopeClosedIcon className="h-8 w-8" />
      </Link>
    </>
  );
}

export default NotificationBubble;
