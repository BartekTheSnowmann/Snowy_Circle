"use client";
import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { GearIcon, TrashIcon } from "@radix-ui/react-icons";
import UserAvatar from "./UserAvatar";
import ImageUploader from "../ImageUploader";
import { deleteAccount, updateUser } from "@/lib/actions/userProfile/actions";
import { toast } from "sonner";
import { placeholders } from "../../../constant/data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateUserSchema } from "@/lib/validators/UserSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { signOut } from "next-auth/react";

interface Props {
  backgroundImage?: string | null;
  image: string;
  username: string;
  password: string;
  bio?: string | null;
}

function ProfileOptions({
  image: userImage,
  username: userUsername,
  password: userPassword,
  backgroundImage: userBackgroundImage,
  bio: userBio,
}: Props) {
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: userUsername,
      bio: userBio || "",
      password: userPassword,
    },
  });

  async function onSubmit(values: z.infer<typeof updateUserSchema>) {
    if (userUsername === values.username) {
      values.username = undefined;
    }
    if (userBio === values.bio) {
      values.bio = undefined;
    }
    if (userPassword === values.password) {
      values.password = undefined;
    }

    const data = {
      username: userUsername,
      updateData: {
        ...values,
      },
    };
    const result = await updateUser(data);
    if (result.success === false) {
      return toast.warning(result.message);
    }

    toast.success(result.message);
    form.reset();
  }

  const [pending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <GearIcon className="h-6 w-6" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-left">
          <div className="mb-4">
            <AlertDialogTitle>Profile Settings</AlertDialogTitle>
            <AlertDialogDescription>
              To save the changes, click the submit button
            </AlertDialogDescription>
          </div>

          <div className="relative">
            <div
              className="relative h-40 w-full"
              style={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${
                  userBackgroundImage
                    ? userBackgroundImage
                    : placeholders.backgroundImagePlaceholder
                })`,
              }}
            >
              <div className="absolute bottom-4 left-4">
                <UserAvatar
                  size="md"
                  userImage={userImage!}
                  username={userUsername}
                />
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 flex flex-col gap-2"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Adaam..." {...field} />
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
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="absolute left-2 top-28">
                      <FormControl>
                        <ImageUploader
                          setImage={field.onChange}
                          image={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="backgroundImage"
                  render={({ field }) => (
                    <FormItem className="absolute right-2 top-2">
                      <FormControl>
                        <ImageUploader
                          setImage={field.onChange}
                          image={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-4" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </div>

          <Button
            className="flex w-fit gap-2 "
            variant={"destructive"}
            onClick={() =>
              startTransition(async () => {
                await deleteAccount(userUsername);
                signOut();
              })
            }
          >
            Delete Account
            <TrashIcon className="h-6 w-6" />
          </Button>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ProfileOptions;
