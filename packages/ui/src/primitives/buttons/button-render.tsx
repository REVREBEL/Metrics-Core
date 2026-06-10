"use client";

import { buttonVariants } from "./button";

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
