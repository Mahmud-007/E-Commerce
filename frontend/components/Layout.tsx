import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { StoreContext, StoreProvider } from "../context/StoreContext";
import { storeContextType, productType } from "../utils/types";
import { useRouter } from "next/router";
import { UrlObject } from "url";
import Link from "next/link";
import Head from 'next/head'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Layout(props:any) {
  const router = useRouter();
  const classes = useStyles();
  const [isCart, setIsCart] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { shoppingList } = useContext(StoreContext) as storeContextType;
  if (isCart) {
    router.push("/cart");
  }
  if (isLogin) {
    router.push("/login");
  }
  return (
    <div>
      <Head>
        <title>{props.title} | KAIMASU</title>
      </Head>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <LocalMallIcon />
            </IconButton>
            <Typography
              variant="h6"
              className={classes.title}
              style={{ flex: 1 }}
            >
              <a href="https://localhost:3000/"></a>
              E-Commerce
            </Typography>

            <Badge badgeContent={shoppingList.length} color="secondary">
              {/* <a href="https://localhost:3000/cart" >
              <ShoppingCartIcon/>
            </a> */}
              <ShoppingCartIcon onClick={() => setIsCart(true)} />
            </Badge>
            {/* <Button color="inherit" onClick={() => setIsLogin(true)}>
            Login
          </Button> */}
            <Link
              href="/login"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Login
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
