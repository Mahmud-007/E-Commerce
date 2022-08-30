import React, { useState, useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import Review from "../components/Review";
import Layout from "../components/Layout";
import Copyright from "../components/Copyright";
import axios from "axios";
import { CheckoutContext } from "../context/CheckoutContext";
import { StoreContext } from "../context/StoreContext";
import { checkoutType, storeContextType } from "../utils/types";
import Link from "next/link";

const steps = ["Shipping address", "Review your order"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    // case 2:
    //   return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    orderHandler();
  };

  const {
    name,
    area,
    address,
    region,
    city,
    phone,
    transactionId,
    setName,
    setPhone,
    setCity,
    setAddress,
    setRegion,
    setArea,
    setTransactionId,
  } = useContext(CheckoutContext) as checkoutType;
  const { getCart } = useContext(StoreContext) as storeContextType;
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const orderHandler = async () => {
    if (activeStep === steps.length - 1) {
      await axios
        .put(
          "http://localhost:8080/ecom/api/shop/checkout",
          {
            address: {
              FullName: name,
              Region: region,
              City: city,
              Area: area,
              Address: address,
              PhoneNumber: phone,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        )
        .then((res) => {
          console.log("checkout", res);
          const id:string = res.data.order.transactionId;
          setTimeout(setTransactionId(id),500);
          setTimeout(getCart, 500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <br />
      <br />
      <br />
      <br />
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          {/* <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography> */}
        </Toolbar>
        <Layout title="Checkout" />
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order transaction ID is <b>{transactionId}</b>{" "}
                  To verify your order, please enter your order transaction ID
                  to <Link href={"transaction"}>
                    Transaction Varification
                  </Link>{" "}
                  page.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
