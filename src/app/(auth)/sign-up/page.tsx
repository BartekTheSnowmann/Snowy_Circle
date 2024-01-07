import React from "react";
import { SignUpForm } from "./SignUpForm";
import Link from "next/link";

function page() {
  return (
    <section className="p-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Create New Account.</h1>
        <p className="text-muted-foreground">Join us brother!</p>
        <div>
          <p>
            Already have an account?
            <Link className="ml-1 font-semibold text-primary" href={"/sign-in"}>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <SignUpForm />
    </section>
  );
}

export default page;
