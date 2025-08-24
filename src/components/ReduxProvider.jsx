"use client";

import { store } from "@/store/stor";
import { Provider } from "react-redux";
import { ThemeProvider } from "./ThemeContext";

export function ReduxProvider({ children }) {
  return <Provider store={store}>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </Provider>;
}
