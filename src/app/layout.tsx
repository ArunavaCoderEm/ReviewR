import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/Context/theme-provider";
import { Navbar } from "@/components/component/Navbar";
import { ClerkThemeWrapper } from "@/Context/ClerkTheme";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/component/Footer";

export const metadata: Metadata = {
  title: "ReviewR",
  description:
    "A website that helps you get realtime reviews for your website flawlessly.",
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
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkThemeWrapper>
            <Navbar />
            <div className="p-3 min-h-screen">
              {children}
            </div>
            <Footer />
          </ClerkThemeWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
