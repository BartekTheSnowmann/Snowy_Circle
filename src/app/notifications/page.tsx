import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Notification from "./Notification";
import { getUserNotifications } from "./actions";

async function page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return;
  }

  const notifications = await getUserNotifications(session.user.id);

  return (
    <div className="m-4">
      <div className="flex flex-col gap-4">
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}

export default page;
