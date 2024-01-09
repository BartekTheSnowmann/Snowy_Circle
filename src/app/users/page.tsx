import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Userslist from "../search/Userslist";

async function page() {
  return (
    <section className="px-4 py-16">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center drop-shadow-md">
          <h1 className="mb-2 text-3xl font-bold">Our Users</h1>
          <p className="max-w-sm text-muted-foreground">
            Witam wszystkich serdecznie!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Suspense fallback={<Skeleton className="h-10 w-full rounded-md" />}>
            <Userslist />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default page;
