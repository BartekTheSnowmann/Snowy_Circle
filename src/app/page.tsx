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
    <main className="w-full p-4">
      <div className="mx-auto flex w-fit">
        <Button
          disabled={feed === "discover"}
          variant={feed === "discover" ? "default" : "outline"}
          className="rounded-r-none"
        >
          <Link href={"?feed=discover"}>Discover</Link>
        </Button>
        <Button
          disabled={feed === "my-feed" || feed === undefined}
          variant={
            feed === "my-feed" || feed === undefined ? "default" : "outline"
          }
          className="rounded-l-none"
        >
          <Link href={"?feed=my-feed"}>My Feed</Link>
        </Button>
      </div>

      {feed === undefined && <UserFeed />}
      {feed === "my-feed" && <UserFeed />}
      {feed === "discover" && <DiscoverFeed />}
    </main>
  );
}
