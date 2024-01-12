import React, { Suspense } from "react";
import Userslist from "./Userslist";
import Postslist from "./PostsList";
import { Skeleton } from "@/components/ui/skeleton";
import SearchFor from "@/components/other/SearchFor";
import { Metadata } from "next";

interface Props {
  searchParams: {
    q?: string;
  };
}

export const generateMetadata = ({ searchParams: { q } }: Props): Metadata => {
  return {
    title: q ? `Results for ${q}` : "Search",
  };
};

async function page({ searchParams: { q } }: { searchParams: { q: string } }) {
  if (!q) {
    return (
      <section className="text-center">
        <div className="border-t-2 border-muted px-8">
          <SearchFor />
        </div>
      </section>
    );
  }

  return (
    <section className="border-t-2 border-muted px-8">
      <h4 className="mt-4 text-center text-sm text-muted-foreground">
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
