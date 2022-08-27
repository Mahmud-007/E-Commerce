import React, { createContext, useState } from "react";
import { productType, storeContextType } from "../utils/types";
import axios from "axios";

const storeContextDefault: storeContextType = {
  shoppingList: [],
  addToCart: (product: productType,id:any,quantity:number) => {},
  getCart: () => {},
};

export const StoreContext = createContext<storeContextType | null>(
  storeContextDefault
);

export const StoreProvider = (props: any) => {
  const [shoppingList, setShoppingList] = useState<productType[]>([]);
  const addToCart = (product: productType,id:any,quantity:number) => {
    console.log("product");
    axios
      .post(
        "http://localhost:8080/ecom/api/shop/update-cart",
        {
          productId: id,
          productName: product.name,
          productPrice: product.price,
          productImage: product.image.src,
          productQuantity: quantity,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
        }
      )
      .then((response) => {
        console.log({ response });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCart = () => {
    console.log("getCart called");
    axios
      .get("http://localhost:8080/ecom/api/shop/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        console.log("cart", response.data);
        setShoppingList(response.data.cart.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const value = {
    shoppingList,
    addToCart,
    getCart,
  };
  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
};
