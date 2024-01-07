import React, { Suspense } from "react";
import Userslist from "./Userslist";
import Postslist from "./PostsList";
import { Skeleton } from "@/components/ui/skeleton";

async function page({ searchParams: { q } }: { searchParams: { q: string } }) {
  if (!q) {
    return <section className="p-4 text-center"></section>;
  }

  return (
    <section className="p-4">
      <h4 className="text-center">
        Results for <span className="text-primary">{q}</span>
      </h4>

      <Suspense fallback={<Skeleton className="h-10 w-full rounded-md" />}>
        <Userslist q={q} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-60 w-full rounded-md" />}>
        <Postslist q={q} />
      </Suspense>
    </section>
  );
}

export default page;
