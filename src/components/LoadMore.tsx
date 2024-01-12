"use client";

import { getDiscoverFeed, getUserFeed } from "@/lib/actions/feed/actions";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Post from "./shared/Post";
import { getUserPosts } from "@/app/user/[username]/actions";
import { ReloadIcon } from "@radix-ui/react-icons";
import NoMorePosts from "./other/NoMorePosts";

let page = 2;

interface Props {
  feedType: "discover" | "my-feed" | "user";
  perPage: number;
  session?: Session;
  userId?: string;
}

function LoadMore({ feedType, perPage, session, userId }: Props) {
  const [noMorePosts, setNoMorePosts] = useState(false);
  const { ref, inView } = useInView();

  const fetchMorePosts = async () => {
    if (feedType == "user") {
      const result = await getUserPosts(undefined, userId, perPage, page);
      if (!result.posts?.length) {
        setNoMorePosts(true);
        return;
      }
      return result.posts;
    }

    if (feedType == "discover") {
      const result = await getDiscoverFeed(
        session?.user?.id || undefined,
        perPage,
        page,
      );

      if (!result.posts.length) {
        setNoMorePosts(true);
        return;
      }
      return result.posts;
    }

    if (feedType == "my-feed") {
      const result = await getUserFeed(session?.user?.id!, perPage, page);

      if (!result.posts?.length) {
        setNoMorePosts(true);
        return;
      }
      return result.posts;
    }
  };
  const [prevFeedType, setPrevFeedType] = useState<
    "discover" | "my-feed" | "user" | undefined
  >();

  useEffect(() => {
    if (prevFeedType !== feedType) {
      setPosts([]);
      page = 2;
      setNoMorePosts(false);

      fetchMorePosts().then((res) => {
        if (res) {
          setPosts(res);
        }
      });
    }
    setPrevFeedType(feedType);
  }, [feedType]);

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (!noMorePosts) {
      fetchMorePosts().then((res) => {
        if (!res) {
          return;
        } else {
          setPosts([...posts, ...res]);
        }
      });
      page++;
    }
  }, [inView]);

  return (
    <>
      {posts.map((post) => (
        <Post
          key={`post-${post.id}`}
          image={post.User.image!}
          post={post}
          username={post.User.username}
        />
      ))}

      <div ref={ref}>
        {!noMorePosts && (
          <ReloadIcon className="mx-auto h-12 w-12 animate-spin" />
        )}
        {noMorePosts && feedType !== "user" && <NoMorePosts />}
      </div>
    </>
  );
}

export default LoadMore;
