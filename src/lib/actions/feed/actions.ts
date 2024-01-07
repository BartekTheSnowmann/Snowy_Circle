"use server";

import prisma from "@/lib/prisma/db";

export async function getUserFeed(id: string, perPage: number, page: number) {
  const userFollows = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      followingIds: true,
    },
  });

  if (!userFollows?.followingIds.length) {
    return {
      success: false,
      message: "Your feed is empty, start by following someone!",
    };
  }

  const followingsPosts = await prisma.post.findMany({
    where: {
      userId: {
        in: userFollows?.followingIds,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: perPage,
    skip: Number(page - 1) * perPage,
    include: {
      comments: {
        select: {
          body: true,
          createdAt: true,
          id: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              image: true,
              username: true,
            },
          },
        },
      },
      User: {
        select: {
          id: true,
          image: true,
          username: true,
        },
      },
    },
  });

  if (followingsPosts.length === 0) {
    return { success: false, message: "no more posts", posts: followingsPosts };
  }

  return {
    success: true,
    message: "Your feed is here",
    posts: followingsPosts,
  };
}

export async function getDiscoverFeed(
  id: string | undefined,
  perPage: number,
  page: number,
) {
  if (!id) {
    const discoverPosts = await prisma.post.findMany({
      where: {
        User: {
          NOT: {},
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: perPage,
      skip: Number(page - 1) * perPage,
      include: {
        comments: {
          select: {
            body: true,
            createdAt: true,
            id: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                image: true,
                username: true,
              },
            },
          },
        },
        User: {
          select: {
            id: true,
            image: true,
            username: true,
          },
        },
      },
    });

    if (!discoverPosts) {
      return {
        success: false,
        message: "Could not find anything",
        posts: [],
      };
    }

    return {
      success: true,
      message: "Your feed is here",
      posts: discoverPosts,
    };
  }

  const discoverPosts = await prisma.post.findMany({
    where: {
      User: {
        NOT: { id },
      },
    },
    take: perPage,
    skip: Number(page - 1) * perPage,
    include: {
      comments: {
        select: {
          body: true,
          user: {
            select: {
              id: true,
              image: true,
              username: true,
            },
          },
        },
      },
      User: {
        select: {
          id: true,
          image: true,
          username: true,
        },
      },
    },
  });

  if (!discoverPosts) {
    return {
      success: false,
      message: "Could not find anything",
      posts: discoverPosts,
    };
  }

  return {
    success: true,
    message: "Your feed is here",
    posts: discoverPosts,
  };
}
