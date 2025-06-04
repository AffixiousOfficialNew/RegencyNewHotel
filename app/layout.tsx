// app/layout.tsx
import "@/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";


export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
       
      >
      
          <div>
            <main>{children}</main>
           
          </div>
      
      </body>
    </html>
  );
}
