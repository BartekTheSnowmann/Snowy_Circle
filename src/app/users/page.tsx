import { GearIcon } from "@radix-ui/react-icons";
import React from "react";
import { getAllUsers } from "./actions";
import UserInfo from "@/components/shared/UserInfo";

async function page() {
  const users = await getAllUsers();

  return (
    <section className="px-4 py-16">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="font-bold">Our Users</h1>
          <p className="max-w-sm text-muted-foreground">
            Witam wszystkich serdecznie!
          </p>
        </div>
        <div className="flex gap-4">
          {users.map((user) => (
            <UserInfo
              key={`users=${user.id}`}
              size="md"
              image={user.image!}
              username={user.username}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default page;
