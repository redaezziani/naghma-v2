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
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>


      </div>
      <aside className="w-full bg-primary-foreground z-50 h-screen hidden lg:block lg:col-span-1 border-r border sticky top-0 right-0">
        <Sidemenu />
      </aside>
      <div className="w-full relative overflow-auto col-span-5 lg:col-span-4 ">

        {children}
        <Toaster
          position="top-right"
        />
      </div>
    </div>
  );
}
