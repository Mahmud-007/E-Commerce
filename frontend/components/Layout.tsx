import React, { useContext, useState, useEffect } from "react";
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
import { storeContextType, productType, userType } from "../utils/types";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const ITEM_HEIGHT = 48;

export default function Layout(props: any) {
  const router = useRouter();
  const classes = useStyles();
  const { shoppingList, getCart } = useContext(
    StoreContext
  ) as storeContextType;
  console.log({ shoppingList });
  const [isCart, setIsCart] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar,setAvatar] = useState("")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.setItem("User", "");
  };
  if (isCart) {
    router.push("/cart");
  }
  console.log({avatar})
  useEffect(() => {
    getCart();
    const userString = localStorage.getItem("User");
    if (!userString) {
      router.push("/signin");
    } else {
      const user: userType = JSON.parse(userString);
      setUsername(user.username);
      setAvatar(user.avatar)
      console.log({ user });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Head>
        <title>{props.title} | KAIMASU</title>
      </Head>
      <div className={classes.root}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Link href="/">
                <LocalMallIcon />
              </Link>
            </IconButton>

            <Typography
              variant="h6"
              className={classes.title}
              style={{ flex: 1 }}
              onClick={() => router.push("/")}
            >
              KAIMASU E-Commerce
            </Typography>
            <Badge badgeContent={shoppingList.length} color="secondary">
              <ShoppingCartIcon onClick={() => setIsCart(true)} />
            </Badge>
            <Button
              color="inherit"
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              {username}
            </Button>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem sx={{ justifyContent: "center" }} onClick={handleClose}>
                <Box
                  onClick={() => {
                    router.push("/signin");
                  }}
                >
                  Logout
                </Box>
              </MenuItem>
            </Menu>
            <Avatar alt="Remy Sharp" src={avatar}/>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
