import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getUserNotifications } from "./actions";

export const revalidate = 0;

async function NotificationIcon() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return;
  }

  const notification = await getUserNotifications(session?.user.id);

  const countReads = notification.reduce((count, item) => {
    if (item.read === false) {
      return count + 1;
    }
    return count;
  }, 0);

  return (
    <div>
      <Link
        key={`userlink-notifications`}
        className="relative hidden items-center gap-2 font-medium capitalize duration-300 hover:text-primaryForeground md:flex"
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
        className="relative flex items-center gap-2 font-medium capitalize duration-300 hover:text-primaryForeground md:hidden"
        href={"/notifications"}
      >
        <EnvelopeClosedIcon className="h-8 w-8" />
      </Link>
    </div>
  );
}

export default NotificationIcon;
