import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const BankDetail: NextPage = () => {
  const [acNumber, setacNumber] = useState("");
  const [acName, setacName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const bodyParameters = {
    bankAccountNo: acNumber,
    bankAccountName: acName,
    bankAccountToken: password,
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/ecom/api/bank-details",
        { bodyParameters },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
        }
      )
      .then((response) => {
        console.log("response", response.data);
        router.push("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <Layout title="Bank Detail"/>
      <h1>Bank Details</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Account Number"
          onChange={(e: any) => setacNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Account Name"
          onChange={(e: any) => setacName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
};
export default BankDetail;
