import React from "react";
import { redirect } from "next/navigation";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import FormBtn from "./shared/FormBtn";

function SearchBar() {
  const handleSubmit = async (formdata: FormData) => {
    "use server";
    const q = formdata.get("q")?.toString().trim();
    if (!q) {
      return;
    }

    redirect(`/search?q=${q}`);
  };

  return (
    <div>
      <form action={handleSubmit} className="flex">
        <input
          className="rounded-l-md border-2 border-primaryColor px-2 outline-none"
          type="text"
          name="q"
          placeholder="Jarek Kaczynski..."
        />
        <FormBtn className="rounded-l-none">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </FormBtn>
      </form>
    </div>
  );
}

export default SearchBar;
