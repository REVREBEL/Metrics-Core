import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const configDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(configDirectory, "../../..");

const config: StorybookConfig = {
  stories: ["../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: [
    {
      from: resolve(repositoryRoot, "packages/ui/src/fonts"),
      to: "/assets",
    },
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(currentConfig) {
    return mergeConfig(currentConfig, {
      plugins: [
        tsconfigPaths({
          projects: [resolve(repositoryRoot, "tsconfig.json")],
        }),
      ],
    });
  },
};

export default config;
