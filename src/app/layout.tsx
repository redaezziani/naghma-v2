import type { Metadata } from "next";
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
      className="w-full min-h-screen flex justify-center items-center gap-2 relative" 
      >
       <ThemeProvider
       
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
