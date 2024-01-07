import Image from "next/image";
import React from "react";
import UnlockImg from "@/../public/svgs/unlockImg.svg";

function NoSession() {
  return (
    <div className="my-16 flex flex-col items-center gap-12">
      <div className="text-center">
        <h4 className="font-bold">Uwaga</h4>
        <p>You must be logged in to access this feature!</p>
      </div>

      <Image
        src={UnlockImg}
        alt="no session"
        role="presentation"
        width={200}
        height={200}
      />
    </div>
  );
}

export default NoSession;
