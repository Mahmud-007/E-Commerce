import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import {
  productType,
  storeContextType,
  productContextType,
} from "../utils/types";
import { StoreContext, StoreProvider } from "../utils/StoreContext";
import { NextPage } from "next";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Link from "next/link";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
import axios from "axios";
import { useRouter } from "next/router";

const Cart: NextPage = () => {
  const router = useRouter();
  const classes = useStyles();
  const { shoppingList } = useContext(StoreContext) as storeContextType;
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  console.log({ shoppingList });
  const checkoutHanlder = () => {
    axios
      .put(
        "http://localhost:8080/ecom/api/shop/checkout",
        {
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
        setTimeout(() => {
            // empty shopping list
          router.push("/");
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Layout title="Cart" />
      <h1>Cart</h1>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shoppingList.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">1</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <input
        type="text"
        placeholder="Address"
        onChange={(e: any) => setAddress(e.target.value)}
      ></input>
      <button onClick={checkoutHanlder}>Checkout</button>
      <h3>hello {message}</h3>
    </div>
  );
};
export default Cart;
