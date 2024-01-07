import React from "react";
import { SignInForm } from "./SignInForm";
import Link from "next/link";

function page() {
  return (
    <section className="p-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">Welcome Back!</p>
        <p>
          Doesnt have an account?
          <Link className="ml-1 font-semibold text-primary" href={"/sign-up"}>
            Sign up
          </Link>
        </p>
      </div>

      <SignInForm />
    </section>
  );
}

export default page;
