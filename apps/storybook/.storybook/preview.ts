import type { Preview } from "@storybook/react-vite";

// import "../storybook.css";
import "@styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: "^on[A-Z].*",
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "padded",
  },
};

export default preview;