"use server";

import prisma from "@/lib/prisma/db";

export async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      username: true,
      id: true,
      image: true,
    },
  });
}
