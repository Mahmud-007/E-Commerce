import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { StoreContext, StoreProvider } from "../utils/StoreContext";
import { storeContextType, productType } from "../utils/types";

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

export default function Layout({title}) {
  console.log(title);
  const classes = useStyles();
  const {shoppingList} = useContext(StoreContext) as storeContextType;
  console.log("shoppingList", shoppingList);
  return ( 
    
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
              E-Commerce
            </Typography>

            <Badge badgeContent={shoppingList.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
  );
}
