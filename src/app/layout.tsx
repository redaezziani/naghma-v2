import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/provider/theme-provider";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "شركة القهوة التي توصلها",
  description: "تم إنشاؤها بواسطة تطبيق القهوة التالي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <ThemeProvider
         attribute="class"
         defaultTheme="dark"
         enableSystem
         disableTransitionOnChange
        >
        {children}
        <Toaster 
        position="top-right"
        />
        </ThemeProvider>
        </body>
    </html>
  );
}
