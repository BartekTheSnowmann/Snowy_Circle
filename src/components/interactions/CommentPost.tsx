"use client";

import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { commentPost } from "@/lib/actions/interactions/actions";
import { toast } from "sonner";

function CommentPost({ postId }: { postId: string }) {
  const [pending, startTransition] = useTransition();
  const [body, setBody] = useState("");

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (body.length < 1) {
      return;
    }

    startTransition(async () => {
      const result = await commentPost(body, postId);
      if (result.success === false) {
        toast.warning(result.message);
      }
      setBody("");
    });
  };

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmitComment}>
        <textarea
          rows={3}
          className="p-2"
          placeholder="Nice post..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button className="rounded-l-none" variant={"outline"} type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default CommentPost;
