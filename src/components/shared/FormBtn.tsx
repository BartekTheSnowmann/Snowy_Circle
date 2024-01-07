"use client";

import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type FormBtnProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

function FormBtn({ children, className }: FormBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button className={`${className}`} type="submit" disabled={pending}>
      {pending ? <ReloadIcon className="h-6 w-6 animate-spin" /> : children}
    </Button>
  );
}

export default FormBtn;
