import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Topnav from "@/components/topnav";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Topnav />
      <Component {...pageProps} />
    </div>
  );
}