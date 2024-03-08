import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/provider/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import '@/app/globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
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
        
          {children}
          <SpeedInsights />
          <Toaster
            position="top-right"
          />
      </body>
    </html>
  );
}
