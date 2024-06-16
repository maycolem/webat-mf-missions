import { store } from "@/app";
import { Setup } from "@/components";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Setup>
          <Component {...pageProps} />
        </Setup>
      </NextUIProvider>
    </Provider>
  );
}
