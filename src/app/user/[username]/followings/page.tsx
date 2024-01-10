import React from "react";
import { getUserFollowings } from "../actions";
import UserInfo from "@/components/shared/UserInfo";

async function page({
  params: { username },
}: {
  params: { username: string };
}) {
  const { usersData } = await getUserFollowings(username);

  return (
    <section>
      <div className="border-y-2 border-muted p-4 font-medium">{username}</div>

      <div className="flex flex-col gap-4 p-4">
        {usersData?.map((user) => (
          <UserInfo
            key={`followings-${user.id}`}
            image={user.image!}
            username={user.username}
          />
        ))}
      </div>
    </section>
  );
}

export default page;
