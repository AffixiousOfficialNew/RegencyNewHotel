
import "@/styles/globals.css";

import { Providers } from "../redux/providers";
import LocaleProviderClient from "./LocaleProviderClient";

export default function RootLayout({children}: {children: React.ReactNode}) {

   return (
    <html suppressHydrationWarning lang={"en"}>
      <head />
      <body
      >
      <Providers>
          <div>
            <main>   <LocaleProviderClient>{children}</LocaleProviderClient></main>
            
          </div>
      </Providers>
 
      </body>
    </html>
  );
}

