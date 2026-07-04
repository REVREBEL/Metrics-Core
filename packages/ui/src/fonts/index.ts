export const fonts = [
  "General Sans",
  "Khand",
  "Funnel Sans",
  "Fira Code",
  "Supreme",
  "Noto Emoji",
  "Pacifico",
  "Barlow",
  "Logic Monoscript",
] as const;

export type Font = (typeof fonts)[number];
