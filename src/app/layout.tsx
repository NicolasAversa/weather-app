import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export const metadata: Metadata = {
  title: "Chaindots Weather app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
