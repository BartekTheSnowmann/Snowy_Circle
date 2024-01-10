"use client";

import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getUserNotifications } from "./actions";
import { TExtendedNotification } from "@/lib/types";

function NotificationBubble({ session }: { session: Session }) {
  const [notifications, setNotifications] = useState<TExtendedNotification[]>(
    [],
  );
  const [countReads, setCountReads] = useState<number>(0);

  const fetchNotifications = async () => {
    try {
      const notifications = await getUserNotifications(session.user.id);
      setNotifications(notifications);
      const unreadCount = notifications.filter((item) => !item.read).length;
      setCountReads(unreadCount);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 3000);

    return () => clearInterval(interval);
  }, [session.user.id]);

  return (
    <>
      <Link
        key={`userlink-notifications`}
        className="relative hidden items-center gap-2 font-medium capitalize duration-300 hover:text-primary md:flex"
        href={"/notifications"}
      >
        <div className="absolute -left-2 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-white shadow-md">
          <span className="text-sm font-light">{countReads}</span>
        </div>
        <EnvelopeClosedIcon className="h-4 w-4" />
        Notifications
      </Link>
      <Link
        key={`mobile_userlink-notifications`}
        className="relative items-center gap-2 font-medium capitalize duration-300 hover:text-primary md:hidden"
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
