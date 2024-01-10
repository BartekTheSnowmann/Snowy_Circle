import React from "react";
import SearchForImg from "@/../public/svgs/undraw_people_search_img.svg";
import Image from "next/image";

function SearchFor() {
  return (
    <div className="my-16 flex flex-col items-center gap-12">
      <div className="text-center drop-shadow-md">
        <h4 className="mb-2 text-3xl font-bold">Search</h4>
        <p className="text-muted-foreground">
          Here you can search for both - Users and Posts
        </p>
      </div>
      <Image
        src={SearchForImg}
        alt="Search for"
        role="presentation"
        width={140}
        height={140}
      />
    </div>
  );
}

export default SearchFor;
