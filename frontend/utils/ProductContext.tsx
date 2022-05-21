import React, { createContext, useState } from "react";
import { productContextType, productType } from "./types";

const productContextTypeDefault:productContextType ={
  productList: []
}
export const ProductContext = createContext<productContextType | null>(productContextTypeDefault);

export const ProductProvider = (props: any) => {
  const productListDefault: productType[] = [
    {
      image: "https://www.scorebat.com/og/m/og1152402.jpeg",
      name: "first",
      price: 100,
      slug: null,
    },
    {
      image: "https://www.scorebat.com/og/m/og1152402.jpeg",
      name: "second",
      price: 200,
      slug: null,
    },
    {
      image: "https://www.scorebat.com/og/m/og1152402.jpeg",
      name: "third",
      price: 300,
      slug: null,
    },
  ];
  const [productList, setProductList] =
    useState<productType[]>(productListDefault);

  const value = { productList };
  
  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  );
};
