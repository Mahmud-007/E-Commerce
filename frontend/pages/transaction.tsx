import React, { useState } from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Copyright from "../components/Copyright";
import axios from "axios";

const Transaction: NextPage = () => {
  const [details, setDetails] = useState("");
  const [id, setId] = useState("");
  const transactionDetails = () => {
    console.log({ id });
    axios
      .get(
        `http://localhost:8080/ecom/api/shop/transaction-chain?transactionId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setDetails(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Layout title="Transaction Varification" />
      <Card
        sx={{ maxWidth: 700 }}
        style={{ marginTop: "150px", marginLeft: "500px" }}
      >
        <h2 style={{ margin: "10px" }}>Transaction Varification</h2>
        <CardContent>
          <TextField
            style={{ width: "100%" }}
            id="outlined-basic"
            label="Transaction Id"
            variant="outlined"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            onClick={transactionDetails}
            size="small"
            style={{ width: "100%" }}
          >
            Varify
          </Button>
        </CardActions>
      </Card>
      <h3>{details}</h3>
      <br />
      <br />
      <br />
      <Copyright />
    </div>
  );
};

export default Transaction;
