import Image from "next/image";
import React from "react";
import UnlockImg from "@/../public/svgs/undraw_unlock_img.svg";

function NoSession() {
  return (
    <div className="my-16 flex flex-col items-center gap-12">
      <div className="text-center drop-shadow-md">
        <h4 className="mb-2 text-3xl font-bold">Unauthorized</h4>
        <p className="text-muted-foreground">
          In order to access this feature, you must be logged in!
        </p>
      </div>

      <Image
        src={UnlockImg}
        alt="no session"
        role="presentation"
        width={140}
        height={140}
      />
    </div>
  );
}

export default NoSession;
