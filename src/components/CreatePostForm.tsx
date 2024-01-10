"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PostSchema } from "@/lib/validators/PostSchema";
import ImageUploader from "./ImageUploader";
import { createNewPost } from "@/lib/actions/posts/actions";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

export default function CreatePost() {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      body: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PostSchema>) {
    if (!values.body && !values.image) {
      return;
    }

    setIsPending(true);
    await createNewPost(values.body, values?.image);
    setIsPending(false);
    form.reset();
  }

  return (
    <>
      <Form {...form}>
        <form
          className="m-8 max-w-full flex-1"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="relative">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Whats up?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-40 w-full"
                      placeholder="I like oranges..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="mt-4 flex gap-x-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploader
                        setImage={field.onChange}
                        image={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="h-10" disabled={isPending}>
                {isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
