import React from "react";
import { getUsers } from "./actions";
import UserInfo from "@/components/shared/UserInfo";

async function Userslist({ q }: { q: string }) {
  const { foundUsers } = await getUsers(q);

  if (!foundUsers?.length || foundUsers == undefined) {
    return (
      <div className="m-4">
        <div>
          <p>Found 0 users</p>
          <div className="separator mb-4 mt-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="m-4">
      <div>
        <p>
          Found {foundUsers?.length} {foundUsers.length > 1 ? "users" : "user"}
        </p>
        <div className="separator mb-4 mt-2" />
      </div>
      <div className="flex flex-col gap-4">
        {foundUsers.map((user) => (
          <UserInfo
            key={`search_result-${user.id}`}
            image={user.image!}
            username={user.username}
          />
        ))}
      </div>
    </div>
  );
}

export default Userslist;
