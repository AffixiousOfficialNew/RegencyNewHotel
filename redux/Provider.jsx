"use client";
import { Provider } from "react-redux";
import { store } from "./store";

export function Providers({ children }) {
    
  console.log("Providers rendered with children:", children);
  return <Provider store={store}>{children}</Provider>;
}