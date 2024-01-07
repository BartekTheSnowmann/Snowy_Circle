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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userSchema } from "@/lib/validators/UserSchema";
import { loginUser } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export function SignInForm() {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
    },
  });

  const router = useRouter();

  const [isPending, setIsPending] = useState<boolean | null>(null);

  async function onSubmit(values: z.infer<typeof userSchema>) {
    setIsPending(true);
    const result = await loginUser(values);
    if (result.success === false) {
      setIsPending(false);
      return toast.warning(result.message);
    }

    try {
      const login = await signIn("credentials", {
        callbackUrl: "/",
        redirect: false,
        username: values.username,
        password: values.password,
      });

      if (login?.status == 200) {
        toast.success(`Welcome back ${values.username}!`);
        setIsPending(false);
        router.push("/");
        router.refresh();
      } else {
        setIsPending(false);
        toast.error("User not Found 🙃. You might have misspelled something");
      }
    } catch (error) {
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Adam123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="***" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"default"} className="mt-4" type="submit">
          {isPending ? (
            <ReloadIcon className="h-6 w-6 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
