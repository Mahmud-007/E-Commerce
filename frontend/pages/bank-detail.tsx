import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import Head from "next/head";
import Alert from "@mui/material/Alert";
import Copyright from "../components/Copyright";
import axios from "axios";
import { NextPage } from "next";
import Layout from "../components/Layout";
import AssignmentIcon from "@mui/icons-material/Assignment";

const BankDetail: NextPage = () => {
  const [acNumber, setacNumber] = useState("");
  const [acName, setacName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const theme = createTheme();

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
        { ...bodyParameters },
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
      <Layout title="Bank Detail" />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AssignmentIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Bank Account Details
            </Typography>
            <Box
              component="form"
              // onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={(e: any) => setacNumber(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="account number"
                label="Account Number"
                name="account number"
                autoComplete="account number"
                autoFocus
              />
              <TextField
                onChange={(e: any) => setacName(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="Account Name"
                label="Account Name "
                name="Account Name"
                autoComplete="Account Name"
                autoFocus
              />
              <TextField
                onChange={(e: any) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Details
              </Button>
              <Grid container></Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};
export default BankDetail;
