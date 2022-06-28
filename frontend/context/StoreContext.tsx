import React, { createContext, useState } from "react";
import { productType, storeContextType } from "../utils/types";


const storeContextDefault: storeContextType = {
  shoppingList: [],
  addToCart: (product:productType) => {},
};
export const StoreContext = createContext<storeContextType | null>(storeContextDefault);

export const StoreProvider = (props: any) => {
  const [shoppingList, setShoppingList] = useState<productType[]>([]);
  const addToCart=(product:productType)=>{
    console.log("Adding")
    console.log('product',product);
    setShoppingList((pre)=>[...pre,product])
  }
  const value = {
    shoppingList,
    addToCart,
  };
  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
};
