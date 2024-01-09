import React from "react";
import { authLinks, navLinks, userLinks } from "../../../constant/data";
import Link from "next/link";
import SignOutBtn from "./SignOutBtn";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { twMerge } from "tailwind-merge";
import NotificationIcon from "@/app/notifications/NotificationIcon";

interface Props {
  session: Session | null;
}

export async function DesktopNavlinks({ session }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {navLinks.map((navlink) => (
        <Link
          key={`navlink-${navlink.name}`}
          className="flex items-center gap-2 font-medium capitalize duration-300 hover:text-primaryForeground"
          href={navlink.link}
        >
          <navlink.icon className="h-4 w-4" />
          {navlink.name}
        </Link>
      ))}
      {session?.user ? (
        <>
          {userLinks.map((userlink) => (
            <Link
              key={`userlink-${userlink.name}`}
              className="flex items-center gap-2 font-medium capitalize duration-300 hover:text-primaryForeground"
              href={userlink.link}
            >
              <userlink.icon className="h-4 w-4" />
              {userlink.name}
            </Link>
          ))}
          <NotificationIcon />

          <SignOutBtn />
        </>
      ) : (
        authLinks.map((authlink) => (
          <Button key={`authlink_btn-${authlink.name}`} asChild>
            <Link key={`authlink-${authlink.name}`} href={authlink.link}>
              {authlink.name}
            </Link>
          </Button>
        ))
      )}
    </ul>
  );
}

export async function MobileNavlinks({
  session,
}: {
  session?: Session | null;
}) {
  return (
    <ul className="flex justify-around gap-2">
      {navLinks.map((navlink) => (
        <Link
          key={`mobile_navlink-${navlink.name}`}
          className="flex items-center gap-2 font-medium capitalize duration-300 hover:text-primaryForeground"
          href={navlink.link}
        >
          <navlink.icon className="h-8 w-8" />
        </Link>
      ))}

      {session?.user ? (
        <>
          {userLinks.map((userlink) => (
            <Link
              key={`mobile_userlink-${userlink.name}`}
              className="flex items-center gap-2 font-medium capitalize duration-300 hover:text-primaryForeground"
              href={userlink.link}
            >
              <userlink.icon className="h-8 w-8" />
            </Link>
          ))}
          <NotificationIcon />

          <SignOutBtn iconOnly />
        </>
      ) : (
        authLinks.map((authlink) => (
          <Button
            key={`mobile_authlink_btn-${authlink.name}`}
            className={twMerge("m-0 p-0")}
            variant={"ghost"}
            asChild
          >
            <Link key={`mobile_authlink-${authlink.name}`} href={authlink.link}>
              <authlink.icon className="h-8 w-8" />
            </Link>
          </Button>
        ))
      )}
    </ul>
  );
}
