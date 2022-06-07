import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const submitHandler = async (e: any) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/ecom/api/auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("Token", response.data.token);
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
      <Layout title="Login" />
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Email"
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <input type="submit" placeholder="Login" />
      </form>
      <br />
      <Link href="/signup">Sign UP</Link>
    </div>
  );
};

export default Login;
