import React, { createContext, useState } from "react";
import { userType, userContextType } from "../utils/types";

const userContextTypeDefault: userContextType = {
  avatar: "",
  hasBankAccount: false,
  token: "",
  userId: "",
  username: "",
  message: "",
  setAvatar: function (): void {},
  setHasBankAccount: function (): void {},
  setToken: function (): void {},
  setUserId: function (): void {},
  setUsername: function (): void {},
  setMessage: function (): void {},
};
export const UserContext = createContext<userContextType | null>(
  userContextTypeDefault
);

export const UserProvider = (props: any) => {
  const [avatar, setAvatar] = useState("");
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const value = {
    avatar,
    hasBankAccount,
    token,
    userId,
    username,
    message,
    setAvatar,
    setHasBankAccount,
    setToken,
    setUserId,
    setUsername,
    setMessage,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
