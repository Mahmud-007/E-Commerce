import React, { createContext, useState } from "react";
import { productContextType, productType } from "./types";
import water_bottle from "../assets/water_bottle.jpg";
import mug from "../assets/mug.jpg";
import tea_pot from "../assets/tea_pot.jpg";

const productContextTypeDefault: productContextType = {
  productList: [],
};
export const ProductContext = createContext<productContextType | null>(
  productContextTypeDefault
);

export const ProductProvider = (props: any) => {
  const productListDefault: productType[] = [
    {
      id:1,
      image: tea_pot,
      name: "Tea Pot",
      price: 50,
      quantity:0,
    },
    {
      id:2,
      image: mug,
      name: "Mug",
      price: 20,
      quantity:0,
    },
    {
      id:3,
      image: water_bottle,
      name: "Water Bottle",
      price: 30,
      quantity:0,
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
