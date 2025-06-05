// app/layout.tsx
import "@/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";
import { Providers } from "../redux/providers";


export const viewport= {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
       
      >
      <Providers>
          <div>
            <main>{children}</main>
            
           
          </div>
      </Providers>
      </body>
    </html>
  );
}
