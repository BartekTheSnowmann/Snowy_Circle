import UserInfo from "@/components/shared/UserInfo";
import React from "react";
import { getUsers } from "../search/actions";
import { getAllUsers } from "./actions";

async function Users() {
  const users = await getAllUsers();

  return (
    <div>
      {users.map((user) => (
        <UserInfo
          key={`users=${user.id}`}
          size="md"
          image={user.image!}
          username={user.username}
        />
      ))}
    </div>
  );
}

export default Users;
