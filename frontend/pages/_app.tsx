import type { AppProps } from "next/app";
import { StoreProvider } from "../utils/StoreContext";
import { ProductProvider } from "../utils/ProductContext";

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
