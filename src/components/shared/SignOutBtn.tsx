"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ExitIcon } from "@radix-ui/react-icons";

interface Props {
  iconOnly?: boolean;
}

function SignOutBtn({ iconOnly }: Props) {
  if (iconOnly) {
    return (
      <Button
        className={twMerge("m-0 p-0")}
        variant={"ghost"}
        asChild
        onClick={() => signOut()}
      >
        <Link href={"/api/auth/signin"}>
          {iconOnly ? <ExitIcon className="h-8 w-8" /> : "Sign Out"}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className={twMerge("text-md h-auto w-fit gap-2 font-medium")}
      variant={"default"}
      asChild
      onClick={() => signOut()}
    >
      <Link key={`navlink-sign_out`} href={"/api/auth/signin"}>
        <ExitIcon className="h-4 w-4" />
        Sign Out
      </Link>
    </Button>
  );
}

export default SignOutBtn;
