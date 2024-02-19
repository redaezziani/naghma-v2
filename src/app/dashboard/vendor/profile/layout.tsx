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
      className="w-full min-h-screen grid grid-cols-5 relative place-content-start"
    >
        {children}  
    </div>
  );
}
