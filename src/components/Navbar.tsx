import React from "react";
import { ThemeSwitch } from "./themeSwitch";
import { Button } from "./ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SearchBar from "./SearchBar";
import { authLinks, userLinks } from "../../constant/data";
import SignOutBtn from "./shared/SignOutBtn";
import Image from "next/image";
import Logo1 from "@/../public/imgs/logo1_edited.png";

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="border-b-2 border-primary p-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <Link href={"/"}>
          <Image src={Logo1} height={54} width={54} alt="Logo" />
        </Link>

        <SearchBar />

        {session?.user ? (
          <ul className="flex items-center gap-x-2">
            {userLinks.map((userLink, idx) => (
              <Link key={userLink.name} href={userLink.link}>
                <userLink.icon className="h-6 w-6" />
              </Link>
            ))}
            <SignOutBtn />
            <div className="ml-2">
              <ThemeSwitch />
            </div>
          </ul>
        ) : (
          <ul className="flex">
            {authLinks.map((authLink, idx) => (
              <Button
                variant={idx % 2 !== 1 ? "outline" : "secondary"}
                className={idx % 2 !== 1 ? "rounded-r-none" : "rounded-l-none"}
                key={authLink.name}
                asChild
              >
                <Link href={authLink.link}>{authLink.name}</Link>
              </Button>
            ))}
            <div className="ml-2">
              <ThemeSwitch />
            </div>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
