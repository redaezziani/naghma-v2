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
      <body
      className="w-full min-h-screen grid grid-cols-5 relative place-content-start" 
      >
        <div className="w-full z-50 bg-slate-50 sticky top-0 right-0 col-span-1 h-screen border-r border p-2">
          
        </div>
        <div className="w-full relative overflow-auto col-span-4 ">
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
        </div>
        </body>
    </html>
  );
}
