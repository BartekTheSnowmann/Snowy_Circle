"use server";
import prisma from "@/lib/prisma/db";

type TNewUserData = {
  name: string;
  username: string;
  email: string;
  image?: string;
  password: string;
};

export async function createNewUser(formData: TNewUserData) {
  const isUsernameUsed = await prisma.user.findUnique({
    where: {
      username: formData.username,
    },
  });

  const isEmailUsed = await prisma.user.findUnique({
    where: {
      email: formData.email,
    },
  });

  if (isUsernameUsed) {
    return {
      success: false,
      message: "Username is not available",
    };
  }

  if (isEmailUsed) {
    return {
      success: false,
      message: "Email is not available",
    };
  }

  const newUser = await prisma?.user.create({
    data: {
      ...formData,
    },
  });

  return {
    success: true,
    message: `User ${newUser} has been created`,
    newUser,
  };
}
