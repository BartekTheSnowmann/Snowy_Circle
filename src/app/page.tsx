import DiscoverFeed from "@/components/shared/DiscoverFeed";
import UserFeed from "@/components/shared/UserFeed";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home({
  searchParams: { feed },
}: {
  searchParams: { feed: string };
}) {
  return (
    <main className="w-full">
      <div className="sticky top-0 z-50 flex h-20 items-center bg-background shadow-md">
        <div className="mx-auto flex w-fit">
          <Button
            asChild
            variant={
              feed === "discover" || feed === undefined ? "default" : "outline"
            }
            className={`${
              feed === "discover" || feed === undefined
                ? "pointer-events-none"
                : ""
            } rounded-r-none`}
          >
            <Link href={"?feed=discover"}>Discover</Link>
          </Button>
          <Button
            asChild
            variant={feed === "my-feed" ? "default" : "outline"}
            className={`${
              feed === "my-feed" ? "pointer-events-none" : ""
            } rounded-l-none`}
          >
            <Link href={"?feed=my-feed"}>My Feed</Link>
          </Button>
        </div>
      </div>

      {feed === undefined && <DiscoverFeed />}
      {feed === "my-feed" && <UserFeed />}
      {feed === "discover" && <DiscoverFeed />}
    </main>
  );
}
