import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { storeContextType, checkoutType } from "../utils/types";
import { StoreContext } from "../context/StoreContext";
import { CheckoutContext } from "../context/CheckoutContext";

export default function Review() {
  const { shoppingList, totalPrice } = useContext(
    StoreContext
  ) as storeContextType;
  const { name, address, region, city, phone, area, country } = useContext(
    CheckoutContext
  ) as checkoutType;

  const addresses = [address,city,country];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {shoppingList.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.quantity} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{name}</Typography>
          <Typography gutterBottom>{phone}</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
