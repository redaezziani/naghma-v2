import type { Metadata } from "next";
import '../globals.css'
import { ThemeProvider } from "@/components/ui/provider/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Mode } from "@/components/ui/them-mode";
import Sidemenu from '@/components/my-ui/sidemenu';

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
    <div
      className="w-full min-h-screen grid grid-cols-5 relative place-content-start"
    >
      <div className="top-4 fixed z-50 right-4">
      

        <Mode />
      </div>
      <aside className="w-full bg-primary-foreground z-50 h-screen col-span-1 border-r border sticky top-0 right-0">
      <Sidemenu/>
      </aside>
      <div className="w-full relative overflow-auto col-span-4 ">
        
          {children}
          <Toaster
            position="top-right"
          />
      </div>
    </div>
  );
}
