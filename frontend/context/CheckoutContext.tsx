import React, { createContext, useState } from "react";
import { checkoutType } from "../utils/types";

const checkoutContextDefault: checkoutType = {
  name: "",
  address: "",
  city: "",
  region: "",
  area: "",
  country: "",
  phone: "",
  transactionId: "",
  setName: function (): void {},
  setPhone: function (): void {},
  setCity: function (): void {},
  setAddress: function (): void {},
  setRegion: function (): void {},
  setArea: function (): void {},
  setCountry: function (country: string): void {},
  setTransactionId: function (transactionId: string): void {},
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
  const [area, setArea] = useState("");
  const [country, setCountry] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const value = {
    name,
    address,
    region,
    city,
    phone,
    area,
    country,
    transactionId,
    setName,
    setPhone,
    setCity,
    setAddress,
    setRegion,
    setArea,
    setCountry,
    setTransactionId,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {props.children}
    </CheckoutContext.Provider>
  );
};
