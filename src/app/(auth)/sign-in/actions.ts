"use server";
import prisma from "@/lib/prisma/db";

type TUserData = {
  username: string;
  password: string;
};

export async function loginUser(formData: TUserData) {
  const foundUser = await prisma.user.findUnique({
    where: {
      username: formData.username,
    },
  });

  if (!foundUser) {
    return {
      success: false,
      message: "Such user doesnt exist",
    };
  }

  const isPasswordCorrect = formData.password === foundUser.password;
  if (!isPasswordCorrect) {
    return {
      success: false,
      message: "Your password is not correct",
    };
  }

  return {
    success: true,
    message: `Successfully logged in`,
    foundUser,
  };
}
