// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { HeroUIProvider } from "@heroui/system";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

// export function Providers({ children, themeProps }) {
//   const router = useRouter();

//   return (
//     <HeroUIProvider navigate={router.push}>
//       <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
//     </HeroUIProvider>
//   );
// }
"use client";
import { Provider } from "react-redux";
import { store } from "./store";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}