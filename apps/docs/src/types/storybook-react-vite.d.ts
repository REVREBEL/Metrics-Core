declare module "@storybook/react-vite" {
  export type Meta<T = unknown> = {
    title?: string;
    component?: T;
    parameters?: Record<string, unknown>;
    tags?: string[];
    argTypes?: Record<string, unknown>;
  };

  export type StoryObj<T = unknown> = {
    args?: Partial<T> | Record<string, unknown>;
    render?: (...args: unknown[]) => unknown;
    parameters?: Record<string, unknown>;
  };
}
