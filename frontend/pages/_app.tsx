import type { AppProps } from "next/app";
import { StoreProvider } from "../context/StoreContext";
import { ProductProvider } from "../context/ProductContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ProductProvider>
        <Component {...pageProps} />
      </ProductProvider>
    </StoreProvider>
  );
}

export default MyApp;
