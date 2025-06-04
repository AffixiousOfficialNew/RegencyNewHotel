// app/layout.tsx
import "@/styles/globals.css";
import { Viewport } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";


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
      <body className=""
       
      >
      
          <div>
            <Header/>
            <main>{children}</main>
            <Footer/>
          </div>
      
      </body>
    </html>
  );
}
