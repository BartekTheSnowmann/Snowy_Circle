"use server";

import prisma from "@/lib/prisma/db";

export async function getUsers(q: string) {
  const foundUsers = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            startsWith: q,
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  if (!foundUsers) {
    return {
      success: false,
      message: "Could not find users you were searching for",
    };
  }

  return {
    success: true,
    message: "Heres your users",
    foundUsers,
  };
}

export async function getPosts(q: string) {
  const foundPosts = await prisma.post.findMany({
    where: {
      User: {
        NOT: {},
      },
      OR: [
        {
          body: {
            startsWith: q,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      comments: {},
      User: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
    },
  });

  if (!foundPosts) {
    return {
      success: false,
      message: "Could not find users you were searching for",
    };
  }

  return {
    success: true,
    message: "Heres your users",
    foundPosts,
  };
}
