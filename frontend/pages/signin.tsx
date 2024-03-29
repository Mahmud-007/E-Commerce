import { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Copyright from "../components/Copyright";
import { UserContext } from "../context/UserContext";
import { userContextType } from "../utils/types";

const theme = createTheme();

export default function SignIn() {
  // const {
  //   setAvatar,
  //   setHasBankAccount,
  //   setToken,
  //   setUserId,
  //   setUsername,
  //   setMessage,
  // } = useContext(UserContext) as userContextType;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/ecom/api/auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        // setUsername(response.data.username);
        // setAvatar(response.data.avatar);
        // setHasBankAccount(response.data.hasBankAccount);
        // setToken(response.data.token);
        // setUserId(response.data.userId);
        // setMessage(response.data.message);
        localStorage.setItem("Token", response.data.token);
        localStorage.setItem("User", JSON.stringify(response.data));
        if (response.data.hasBankDetails) {
          router.push("/");
        } else {
          router.push("/bank-detail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Head>
        <title>Sign In | KAIMASU</title>
      </Head>
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                 <Link href="#" variant="body2">
                  Forgot password?
                </Link> 
              </Grid> */}
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
