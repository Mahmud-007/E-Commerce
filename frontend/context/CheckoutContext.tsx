import React, { createContext, useState } from "react";
import { productContextType, checkoutType } from "../utils/types";

const checkoutContextDefault: checkoutType = {
  name: "",
  address: "",
  city: "",
  region: "",
  area: "",
  country: "",
  setName: function (): void {
    throw new Error("Function not implemented.");
  },
  setPhone: function (): void {
    throw new Error("Function not implemented.");
  },
  setCity: function (): void {
    throw new Error("Function not implemented.");
  },
  setAddress: function (): void {
    throw new Error("Function not implemented.");
  },
  setRegion: function (): void {
    throw new Error("Function not implemented.");
  },
  phone: "",
};

export const CheckoutContext = createContext<checkoutType | null>(
  checkoutContextDefault
);

export const CheckoutProvider = (props: any) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [area,setArea] = useState("");

  const value = {
    name,
    address,
    region,
    city,
    phone,
    area,
    setName,
    setPhone,
    setCity,
    setAddress,
    setRegion,
    setArea,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {props.children}
    </CheckoutContext.Provider>
  );
};
