import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/Context/theme-provider";

export const metadata: Metadata = {
  title: "Will Think Later",
  description: "Will Think Later",
  icons: {
    icon: ["/Images/logotest.jpg"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
