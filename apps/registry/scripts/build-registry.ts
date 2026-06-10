import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const registry = {
  name: "@repo/ui",
  components: [
    {
      name: "button",
      path: "registry/button.tsx"
    }
  ]
};

const out = resolve(process.cwd(), "public/registry/index.json");
writeFileSync(out, JSON.stringify(registry, null, 2));
console.log(`Wrote ${out}`);
