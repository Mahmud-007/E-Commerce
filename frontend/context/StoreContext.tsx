import React, { createContext, useState } from "react";
import { productType, storeContextType } from "../utils/types";
import axios from "axios";

const storeContextDefault: storeContextType = {
  shoppingList: [],
  addToCart: (product: productType, id: any, quantity: number) => {},
  getCart: () => {},
  totalPrice: 0,
};

export const StoreContext = createContext<storeContextType | null>(
  storeContextDefault
);

export const StoreProvider = (props: any) => {
  const [shoppingList, setShoppingList] = useState<productType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const addToCart = (product: productType, id: any, quantity: number) => {
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
        let products = response.data.cart.products;
        setShoppingList(products);
        let price = 0;
        for (let i = 0; i < products.length; i++) {
          price = price + products[i].price * products[i].quantity;
        }
        setTotalPrice(price);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const value = {
    shoppingList,
    addToCart,
    getCart,
    totalPrice,
  };
  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
};
