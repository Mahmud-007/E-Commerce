import type { AppProps } from "next/app";
import { StoreProvider } from "../context/StoreContext";
import { ProductProvider } from "../context/ProductContext";
import {CheckoutProvider } from "../context/CheckoutContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ProductProvider>
        <CheckoutProvider>
          <Component {...pageProps} />
        </CheckoutProvider>
      </ProductProvider>
    </StoreProvider>
  );
}

export default MyApp;
