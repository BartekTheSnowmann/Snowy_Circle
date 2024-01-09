import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import NotificationBubble from "./NotificationBubble";

async function NotificationIcon() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <NotificationBubble session={session!} />
    </div>
  );
}

export default NotificationIcon;
