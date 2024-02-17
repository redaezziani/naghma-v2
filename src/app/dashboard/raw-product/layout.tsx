import type { Metadata } from "next";
import { DialogFooter , DialogHeader, DialogTitle, DialogDescription, DialogContent, Dialog } from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

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
    <div className="flex w-full">

       <Dialog >
    
                {children}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Category Deletion
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this category?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button >
                        Delete Category
                    </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
    </div>
  );
}
