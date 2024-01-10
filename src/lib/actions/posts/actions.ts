"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function getPost(postId: string) {
  const foundPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      comments: {
        select: {
          createdAt: true,
          id: true,
          updatedAt: true,
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

  if (!foundPost) {
    return {
      success: false,
      message: "Could not find the post",
    };
  }

  return {
    success: true,
    message: "Heres your post",
    foundPost,
  };
}

export async function createNewPost(body: string, image?: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
      message: "Not authorized",
    };
  }

  const newPost = await prisma.post.create({
    data: {
      body,
      image,
      User: {
        connect: {
          id: session?.user.id,
        },
      },
    },
  });

  revalidatePath(`/profile`);
  return newPost;
}

export async function deletePost(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      comments: true,
      Notification: true, // Include notifications related to the post
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  const commentIds = post.comments.map((comment) => comment.id);

  await prisma.comment.deleteMany({
    where: {
      id: {
        in: commentIds,
      },
    },
  });

  // Deleting notifications related to the post
  await prisma.notification.deleteMany({
    where: {
      postId: id,
    },
  });

  await prisma.post.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/profile");
  revalidatePath(`/post/${id}`);
}

export async function deleteComment(commentId: string, path: string) {
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  revalidatePath(path);
  return;
}
