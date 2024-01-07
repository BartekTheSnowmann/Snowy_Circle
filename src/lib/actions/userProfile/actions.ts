"use server";

import prisma from "@/lib/prisma/db";
import { revalidatePath } from "next/cache";

export type TUpdateData = {
  username: string;
  updateData: {
    backgroundImage?: string;
    image?: string;
    bio?: string;
    username?: string;
  };
};

// Update Functions

// Update Data

export async function updateUser(data: TUpdateData) {
  if (!Object.values(data.updateData).length) {
    return {
      success: false,
      message: "No data provided",
    };
  }

  const foundUser = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (!foundUser) {
    return {
      success: false,
      message: "Could not find the user",
    };
  }

  const updateUser = await prisma.user.update({
    where: {
      username: foundUser.username,
    },
    data: {
      ...data.updateData,
    },
    select: {
      backgroundImage: true,
      image: true,
      username: true,
      bio: true,
    },
  });

  revalidatePath("/profile");

  return {
    success: true,
    message: "Updated profile",
    updateUser,
  };
}

// Delete An Account

export async function deleteAccount(username: string) {
  await prisma.user.delete({
    where: {
      username,
    },
  });
  return;
}
