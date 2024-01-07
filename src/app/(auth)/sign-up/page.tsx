import React from "react";
import { SignUpForm } from "./SignUpForm";
import Link from "next/link";

function page() {
  return (
    <section className="px-8 py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-12">
          <h1 className="mb-2 text-3xl font-bold">Sign up</h1>
          <div className="font-medium text-muted-foreground">
            <p>
              Doesnt have an account?
              <Link
                className="ml-1 font-semibold text-primary"
                href={"/sign-in"}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
        <SignUpForm />
      </div>
    </section>
  );
}

export default page;
