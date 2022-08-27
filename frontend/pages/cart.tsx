import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  productType,
  storeContextType,
  productContextType,
  userType,
} from "../utils/types";
import { StoreContext, StoreProvider } from "../context/StoreContext";
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
    maxWidth: 1000,
  },
});
import MaterialTable from "material-table";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";

const Cart: NextPage = () => {
  const [username, setUsername] = useState("");

  const { shoppingList, getCart, addToCart } = useContext(
    StoreContext
  ) as storeContextType;
  const router = useRouter();
  const classes = useStyles();
  console.log({ shoppingList });

  useEffect(() => {
    getCart();
    const userString = localStorage.getItem("User");
    if (!userString) {
      router.push("/signin");
    } else {
      const user: userType = JSON.parse(userString);
      setUsername(user.username);
      console.log({ user });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Layout title="Cart" />
      <h1>Products ordered by {username.toUpperCase()}</h1>
      <TableContainer
        component={Paper}
        style={{ width: "1000px", marginTop: "80px", marginLeft: "350px" }}
      >
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>Product Name</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Price</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Quantity</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Action</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shoppingList.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" onClick={() => addToCart(row)}>
                    +
                  </Button>
                  <Button variant="outlined">-</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <Button variant="contained" onClick={() => router.push("/checkout")}>
        Checkout
      </Button>
    </div>
  );
};
export default Cart;
