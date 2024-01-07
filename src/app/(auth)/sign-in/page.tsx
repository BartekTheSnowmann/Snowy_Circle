import React from "react";
import { SignInForm } from "./SignInForm";
import Link from "next/link";

function page() {
  return (
    <section className="px-8 py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-12">
          <h1 className="mb-2 text-3xl font-bold">Sign in</h1>
          <div className="font-medium text-muted-foreground">
            <p>
              Doesnt have an account?
              <Link
                className="ml-1 font-semibold text-primary"
                href={"/sign-up"}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <SignInForm />
      </div>
    </section>
  );
}

export default page;
