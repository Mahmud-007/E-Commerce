import React, { createContext, useState } from "react";
import { productType, storeContextType } from "../utils/types";
import axios from "axios";

const storeContextDefault: storeContextType = {
  shoppingList: [],
  addToCart: (product: productType) => {},
  getCart: () => {},
};

export const StoreContext = createContext<storeContextType | null>(
  storeContextDefault
);

export const StoreProvider = (props: any) => {
  const [shoppingList, setShoppingList] = useState<productType[]>([]);
  const addToCart = (product: productType) => {
    console.log("Adding");
    console.log("product", product);
    // const findProductIndex = shoppingList.findIndex(
    //   (el) => el.id === product.id
    // );
    // console.log({ findProductIndex });
    // if (findProductIndex >= 0) {
    //   shoppingList[findProductIndex].quantity += 1;
    // } else {
    //   setShoppingList((pre) => [...pre, product]);
    // }
    axios
      .post(
        "http://localhost:8080/ecom/api/shop/update-cart",
        {
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          productImage: product.image.src,
          productQuantity: 1,
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
