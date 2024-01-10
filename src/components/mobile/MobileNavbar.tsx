import React from "react";
import { MobileNavlinks } from "../shared/NavLinks";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

async function MobileNavbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="h-20 border-t-2 border-muted bg-background p-4">
      <MobileNavlinks session={session} />
    </nav>
  );
}

export default MobileNavbar;
