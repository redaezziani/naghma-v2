import type { Metadata } from "next";
import '../globals.css'
import { Toaster } from "@/components/ui/sonner";
import Sidemenu from '@/components/my-ui/sidemenu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import { UserProfile } from '@/components/my-ui/user-profile';



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
      <div className="top-4 fixed z-50 right-4 lg:hidden block">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent className=" bg-white">
              <Sidemenu
              />
          </SheetContent>
        </Sheet>


      </div>
      {/*  */}
      <nav className=" w-full border-slate-300/30 border backdrop-blur-sm bg-white fixed top-0 right-0 flex justify-end px-4 z-40 h-14">
          <UserProfile />
        </nav>

        {/*  */}
      <aside className="w-full bg-primary-foreground z-50 h-screen hidden lg:block lg:col-span-1 border-r border sticky top-0 right-0">
        <Sidemenu />
      </aside>
      <div className="w-full bg-slate-50 relative overflow-auto col-span-5 lg:col-span-4 ">

        {children}
        <Toaster
          position="top-right"
        />
      </div>
    </div>
  );
}
