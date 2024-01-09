import { cn } from "@/lib/utils";
import React from "react";
import { ThemeSwitch } from "./themeSwitch";

function Footer() {
  return (
    <footer
      className={cn(
        "sticky top-0 hidden h-screen min-w-[260px] max-w-[320px] border-l-2 border-muted pb-12 md:block",
      )}
    >
      <div className="flex flex-col items-center">
        <div className="space-y-4 px-4 py-4">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
