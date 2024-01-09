"use server";

import { getUserById } from "@/lib/actions/userProfile/actions";
import prisma from "@/lib/prisma/db";
import { TExtendedNotification } from "@/lib/types";
import { Notification } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function markAsRead(notificationId: string) {
  await prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      read: true,
    },
  });
  return;
}

export async function getUserNotifications(userId: string) {
  const notifications = await prisma.notification.findMany({
    where: {
      userId: userId,
    },
    include: {
      post: {
        select: {
          id: true,
          body: true,
        },
      },
    },
  });

  const notificationsWithActionUser = await Promise.all(
    notifications.map(async (notification) => {
      if (notification.actionUserId) {
        const actionUser = await prisma.user.findUnique({
          where: {
            id: notification.actionUserId,
          },
          select: {
            id: true,
            username: true,
            image: true,
          },
        });
        return { ...notification, actionUser };
      }
      return notification;
    }),
  );

  return notificationsWithActionUser as TExtendedNotification[];
}

export async function createNotification(
  userId: string,
  postId: string,
  actionUserId: string,
  notificationType: "like" | "comment",
) {
  const actionUser = await getUserById(actionUserId);

  let message = "";
  if (!actionUser) {
    return;
  }

  if (notificationType === "comment") {
    message = `${actionUser?.username} commented your post`;
  }
  if (notificationType === "like") {
    message = `${actionUser?.username} liked your post`;
  }

  try {
    const newNotification = await prisma.notification.create({
      data: {
        type: notificationType,
        userId,
        postId,
        actionUserId,
        body: message,
      },
      include: {
        post: {
          select: {
            body: true,
          },
        },
      },
    });

    return newNotification;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create notification");
  }
}

export async function deleteNotification(notificationId: string) {
  if (!notificationId) {
    return;
  }

  await prisma.notification.delete({
    where: {
      id: notificationId,
    },
  });
  revalidatePath("/notifications");
}
