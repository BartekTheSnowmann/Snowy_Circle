import { Comment, Post } from "@prisma/client";

export type CommentWithUser = {
  id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    image?: string | null;
  };
  postId?: string | null;
};

export type TPostWithComments = {
  User: {
    id: string;
    image: string | null;
    username: string;
  };
  body: string;
  comments: any;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  image: string | null;
  likedIds: string[];
  userId: string;
};

export type TComment = {
  id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    image: string | null;
    username: string;
  };
};
