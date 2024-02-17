import type { Metadata } from "next";


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
      className=" w-full min-h-screen px-6 py-3 flex-col   flex justify-start items-start mt-20 "
    >
        {children}
        
    </div>
  );
}
