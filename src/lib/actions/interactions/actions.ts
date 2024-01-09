"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { Post } from "@prisma/client";
import { createNotification } from "@/app/notifications/actions";

export async function getPostInteractions(postId: string) {
  const postData = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      comments: {
        include: {
          user: true,
        },
      },
      likedIds: true,
    },
  });

  if (!postData) {
    return {
      success: false,
      message: "Invalid postId",
    };
  }

  return {
    success: true,
    message: "Heres your post",
    postData,
  };
}

export async function commentPost(body: string, postId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return {
      success: false,
      message: "Log in to comment",
    };
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      comments: {
        create: {
          body,
          user: {
            connect: {
              id: session?.user.id,
            },
          },
        },
      },
    },
  });

  // await createNotification(
  //   updatedPost.userId,
  //   postId,
  //   session.user.id,
  //   "comment",
  // );

  revalidatePath(`post/${postId}`);
  return {
    success: true,
    message: "Commented",
    updatedPost,
  };
}

export async function getPostLikes(postId: string) {
  const postLikes = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      likedIds: true,
    },
  });

  return postLikes;
}

export async function hasUserLiked(postId?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return false;
  }

  const foundUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
    },
  });

  const postData = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!postData) {
    return false;
  }

  const isFollowed = postData?.likedIds?.find(
    (userId) => userId === foundUser?.id,
  );

  if (!isFollowed?.length) {
    return false;
  }

  return true;
}

type LikePostReturnType = Post | any;

export async function likePost(postId: string): Promise<LikePostReturnType> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      success: false,
      message: "Log in to like posts!",
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return {
      success: false,
      message: "Post not found",
    };
  }

  const hasLiked = post?.likedIds.find((userId) => userId === session?.user.id);

  if (hasLiked) {
    // Unlike the post
    const unlike = post?.likedIds.filter(
      (userId) => userId !== session?.user.id,
    );
    revalidatePath("/");

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: {
          set: unlike,
        },
      },
    });

    if (!updatedPost) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }

    // Delete the notification associated with this like action
    await prisma.notification.deleteMany({
      where: {
        type: "like",
        userId: updatedPost.userId,
        actionUserId: session.user.id,
        postId,
      },
    });

    return {
      success: true,
      message: "Post unliked successfully",
      updatedPost,
    };
  } else {
    revalidatePath("/");
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: {
          push: session?.user.id,
        },
      },
    });

    await createNotification(
      updatedPost.userId,
      postId,
      session.user.id,
      "like",
    );

    return {
      success: true,
      message: "Post liked successfully",
    };
  }
}
