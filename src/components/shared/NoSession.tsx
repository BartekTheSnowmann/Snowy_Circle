import Image from "next/image";
import React from "react";
import UnlockImg from "@/../public/svgs/unlockImg.svg";

function NoSession() {
  return (
    <div className="my-16 flex flex-col items-center gap-12">
      <div className="text-center drop-shadow-md">
        <h4 className="mb-2 text-3xl font-bold">Unauthorized</h4>
        <p className="text-muted-foreground">
          You must be logged in to access this feature!
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
