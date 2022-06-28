import React, { useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Signup: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e: any) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/ecom/api/auth/signup`, {
        email: email,
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Layout title="Signup"/>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Email"
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e: any) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <input type="submit" placeholder="Login" />
      </form>
      <br />
      <Link href="/login">Login</Link>
    </div>
  );
};
export default Signup;
