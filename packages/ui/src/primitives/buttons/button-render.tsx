"use client";

import { buttonVariants } from "@buttons/button";

export default function ButtonRender() {
  return (
    <a
      href="/login"
      className={buttonVariants({ variant: "secondary", size: "sm" })}
    >
      Login
    </a>
  );
}
