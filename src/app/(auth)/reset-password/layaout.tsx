import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Foxy Signin",
  description: "A web scraper for dropshipping",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body > 
        {children}
      </body>
    </html>
  );
}
