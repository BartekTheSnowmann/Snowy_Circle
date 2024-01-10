"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { createNotification } from "@/app/notifications/actions";
import prisma from "@/lib/prisma/db";
import { Post } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export type TSelectedUser = {
  id: string;
  followingIds: string[];
  image: string | null;
  posts: Post[];
  username: string | null;
  backgroundImage?: string | null;
  bio?: string | null;
  password: string;
};

export type TUserWithPosts = {
  id: string;
  username: string;
  image: string;
  posts: Post[];
};

export async function getProfile(username?: string, id?: string) {
  let foundUser;

  if (username) {
    foundUser = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        followingIds: true,
        image: true,
        posts: true,
        username: true,
        bio: true,
        backgroundImage: true,
        password: true,
      },
    });
  } else if (id) {
    foundUser = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        followingIds: true,
        image: true,
        posts: true,
        username: true,
        bio: true,
        backgroundImage: true,
        password: true,
      },
    });
  } else {
    return {
      success: false,
      message: "Neither username nor ID provided",
    };
  }

  if (!foundUser) {
    return {
      success: false,
      message: "User not found",
    };
  }

  return {
    success: true,
    message: "User has been found",
    foundUser,
  };
}

export async function getUserPosts(
  username: string | undefined,
  id: string | undefined,
  perPage: number,
  page: number,
) {
  let foundUser;
  let foundPosts;

  if (username) {
    foundUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    foundPosts = await prisma.post.findMany({
      where: {
        User: {
          username,
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

    if (!foundPosts.length) {
      return {
        success: false,
        message: "No more posts",
        posts: [],
      };
    }
  } else if (id) {
    foundPosts = await prisma.post.findMany({
      where: {
        User: {
          id,
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

    if (!foundPosts?.length) {
      return {
        success: false,
        message: "No more posts",
        posts: [],
      };
    }
  } else {
    return {
      success: false,
      message: "Neither username nor ID provided",
    };
  }

  if (!foundPosts) {
    return {
      success: false,
      message: "No posts found",
    };
  }

  return {
    success: true,
    message: "Posts have been found",
    posts: foundPosts,
  };
}

export async function followUser(username: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return {
        success: false,
        message: "Please log in!",
      };
    }

    const userToFollow = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!userToFollow || userToFollow.id === session.user.id) {
      return {
        success: false,
        message: "Invalid user to follow.",
      };
    }

    const followings = (await getFollowings(session.user.id)) || {
      followingIds: [],
    };

    const hasFollowed = followings.followingIds.includes(userToFollow.id);

    if (!hasFollowed) {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          followingIds: {
            push: userToFollow.id,
          },
        },
      });

      await createNotification(
        userToFollow.id,
        undefined,
        session.user.id,
        "follow",
      );

      revalidatePath("/");
      return {
        success: true,
        message: `You followed ${userToFollow.username}`,
      };
    } else {
      const updatedFollowingIds = followings.followingIds.filter(
        (id) => id !== userToFollow.id,
      );

      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          followingIds: {
            set: updatedFollowingIds,
          },
        },
      });

      await prisma.notification.deleteMany({
        where: {
          actionUserId: session.user.id,
          type: "follow",
        },
      });

      revalidatePath("/");
      return {
        success: true,
        message: `You unfollowed ${userToFollow.username}`,
      };
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to follow/unfollow user.");
  }
}

export async function isFollowing(username?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return false;
  }

  const foundUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      followingIds: true,
    },
  });

  const userToFollow = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  const isFollowed = foundUser?.followingIds.find(
    (userId) => userId === userToFollow?.id,
  );

  if (!isFollowed?.length) {
    return false;
  }

  return true;
}

export async function getUserFollowings(username: string) {
  const foundUser = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      followingIds: true,
    },
  });

  if (!foundUser) {
    return {
      success: false,
      message: "Could not find the user",
    };
  }

  const usersData = await prisma.user.findMany({
    where: {
      id: {
        in: foundUser.followingIds,
      },
    },
    select: {
      id: true,
      username: true,
      image: true,
    },
  });

  return {
    success: true,
    message: "There are the followings",
    usersData,
  };
}

export async function getFollowings(userId: string) {
  const followings = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      followingIds: true,
    },
  });

  if (!followings?.followingIds?.length) {
    return;
  }
  return followings;
}
