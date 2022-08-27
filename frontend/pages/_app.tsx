import type { AppProps } from "next/app";
import { StoreProvider } from "../context/StoreContext";
import { ProductProvider } from "../context/ProductContext";
import { CheckoutProvider } from "../context/CheckoutContext";
import { UserProvider } from "../context/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ProductProvider>
        <CheckoutProvider>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </CheckoutProvider>
      </ProductProvider>
    </StoreProvider>
  );
}

export default MyApp;
