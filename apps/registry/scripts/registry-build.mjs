import { spawn } from "node:child_process"

import {
  PUBLIC_REGISTRY_OUTPUT,
  REGISTRY_JSON,
  UI_PACKAGE_ROOT,
  WORKSPACE_ROOT,
} from "./lib/paths.mjs"

async function main() {
  await new Promise((resolve, reject) => {
    const child = spawn(
      "pnpm",
      [
        "-C",
        UI_PACKAGE_ROOT,
        "exec",
        "shadcn",
        "build",
        REGISTRY_JSON,
        "--output",
        PUBLIC_REGISTRY_OUTPUT,
        "--cwd",
        WORKSPACE_ROOT,
      ],
      {
        cwd: WORKSPACE_ROOT,
        stdio: "inherit",
      },
    )

    child.on("exit", (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`shadcn build exited with code ${code}`))
      }
    })

    child.on("error", reject)
  })
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
