"use server";

import prisma from "@/lib/prisma/db";
import { TUpdateData } from "@/lib/types";
import { revalidatePath } from "next/cache";

// Update Data

export async function updateUser(data: TUpdateData) {
  if (!Object.values(data.updateData).length) {
    return {
      success: false,
      message: "No data provided",
    };
  }

  const foundUser = await getUserByUsername(data.username);

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

export async function getUserById(userId: string) {
  const foundUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!foundUser) {
    return;
  }

  return foundUser;
}

export async function getUserByUsername(username: string) {
  const foundUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!foundUser) {
    return;
  }

  return foundUser;
}
