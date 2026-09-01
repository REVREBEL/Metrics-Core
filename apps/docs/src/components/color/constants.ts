const COLOR_VARIANTS = ["compact", "table"] as const;
type ColorVariant = (typeof COLOR_VARIANTS)[number];

export type { ColorVariant };
export { COLOR_VARIANTS };
