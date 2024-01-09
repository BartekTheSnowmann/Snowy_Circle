import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import Logo1 from "@/../public/imgs/logo1_edited.png";
import { DesktopNavlinks } from "./shared/NavLinks";
import Link from "next/link";

export default async function Sidebar() {
  const session = await getServerSession(authOptions);

  return (
    <div
      className={cn(
        "sticky top-0 hidden h-screen min-w-[260px] max-w-[320px] border-r-2 border-muted md:block",
      )}
    >
      <div className="flex flex-col items-center">
        <div className="flex h-20 items-center">
          <Link href="/">
            <Image src={Logo1} alt="logo" width={80} height={80} />
          </Link>
        </div>

        <DesktopNavlinks session={session} />
      </div>
    </div>
  );
}
