import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/Context/theme-provider";
import { Navbar } from "@/components/component/Navbar";

export const metadata: Metadata = {
  title: "ReviewR",
  description: "A website that creates helps you get realtime reviews for your website flawlessly.",
  icons: {
    icon: ["/Assets/reviewRlogo.ico"],
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
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
