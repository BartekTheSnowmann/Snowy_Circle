import ProfileOptions from "@/components/shared/ProfileOptions";
import UserAvatar from "@/components/shared/UserAvatar";
import React from "react";
import { TSelectedUser } from "../user/[username]/actions";
import { placeholders } from "../../../constant/data";

interface Props {
  user: TSelectedUser;
  isProfile: boolean;
}

function UserBanner({ user, isProfile }: Props) {
  return (
    <div className="">
      <div className="relative">
        <div
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(${
              user.backgroundImage
                ? user.backgroundImage
                : placeholders.backgroundImagePlaceholder
            })`,
          }}
          className="relative h-40 w-full"
        ></div>

        <div className="absolute bottom-4 left-4">
          <UserAvatar
            size="md"
            userImage={user.image!}
            username={user.username!}
          />
        </div>
      </div>
      <div className="flex items-center justify-between border-y-2 px-4 py-2">
        <h4 className="font-medium">{user.username}</h4>
        {isProfile && (
          <ProfileOptions
            bio={user.bio}
            password={user.password}
            backgroundImage={user.backgroundImage}
            image={user.image!}
            username={user.username!}
          />
        )}
      </div>
    </div>
  );
}

export default UserBanner;
