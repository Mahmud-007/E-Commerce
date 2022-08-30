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
import { Container, Grid, Typography } from "@material-ui/core";

const Transaction: NextPage = () => {
  const [details, setDetails] = useState("");
  const [id, setId] = useState("");
  const [valid, setvalid] = useState(false);
  const [ecomToSuppllier, setEcomToSuppllier] = useState({
    from: "",
    to: "",
    totalAmount: 0,
    createdAt: "",
  });

  const [customerToEcom, setCustomerToEcom] = useState({
    from: "",
    to: "",
    totalAmount: 0,
    createdAt: "",
  });

  const [ecom, setEcom] = useState({
    balance: "",
    bankAccountName: "",
    bankAccountNo: "",
  });

  const [customer, setCustomer] = useState({
    balance: "",
    bankAccountName: "",
    bankAccountNo: "",
  });

  const [suplier, setSupplier] = useState({
    balance: "",
    bankAccountName: "",
    bankAccountNo: "",
  });

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
        console.log("details", response.data);
        setDetails(JSON.stringify(response.data));
        setEcomToSuppllier(response.data.ecomOrderToSupplierTransaction);
        setCustomerToEcom(response.data.userOrderTransaction);
        setEcom(response.data.bankEcom);
        setCustomer(response.data.bankUser);
        setSupplier(response.data.bankSupplier);
        setvalid(true);
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
              setId(e.target.value.trim());
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
      <br />
      <br />

      {valid ? (
        <div>
          <Container>
            <Grid container>
              <Grid item style={{ width: "45%", margin: "20px" }}>
                <Card>
                  <Typography
                    variant="h4"
                    gutterBottom
                    style={{ margin: "20px" }}
                  >
                    Customer to E-commerce
                  </Typography>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      From : {customerToEcom.from}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      To : {customerToEcom.to}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Amount : {customerToEcom.totalAmount}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Time of transaction :{" "}
                      {customerToEcom.createdAt.split("T")[0]}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item style={{ width: "45%", margin: "20px" }}>
                <Card>
                  <Typography
                    variant="h4"
                    gutterBottom
                    style={{ margin: "20px" }}
                  >
                    E-commerce to Supplier
                  </Typography>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      From : {ecomToSuppllier.from}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      To : {ecomToSuppllier.to}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Amount : {ecomToSuppllier.totalAmount}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Time of transaction :{" "}
                      {ecomToSuppllier.createdAt.split("T")[0]}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid container>
              <Card style={{ width: "95%", margin: "20px" }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ margin: "20px" }}
                >
                  Customer Status
                </Typography>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Balance : {customer.balance}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Bank Account Name : {customer.bankAccountName}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Bank Account No : {customer.bankAccountNo}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Container>{" "}
          <Container>
            <Grid container>
              <Card style={{ width: "95%", margin: "20px" }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ margin: "20px" }}
                >
                  Supplier Status
                </Typography>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Balance : {suplier.balance}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Bank Account Name : {suplier.bankAccountName}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Bank Account No : {suplier.bankAccountNo}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Container>{" "}
          <Container>
            <Grid container>
              <Card style={{ width: "95%", margin: "20px" }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ margin: "20px" }}
                >
                  E-commerce Status
                </Typography>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Balance : {ecom.balance}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Bank Account Name : {ecom.bankAccountName}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Bank Account No : {ecom.bankAccountNo}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Container>
        </div>
      ) : null}
      <br />
      <br />
      <br />
      <Copyright />
    </div>
  );
};

export default Transaction;
