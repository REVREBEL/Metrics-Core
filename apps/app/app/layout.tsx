import type { Metadata } from "next";
import { Providers } from "./providers";
import "@repo/ui/globals.css";

export const metadata: Metadata = {
  title: "Metrics App",
  description: "REVREBEL Metrics Foundation application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
