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
    <section className="">
      <div className="border-b-2 p-4">{username}</div>

      <div className="p-4">
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
