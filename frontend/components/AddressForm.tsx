import React, { useContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { CheckoutContext } from "../context/CheckoutContext";
import { checkoutType } from "../utils/types";

export default function AddressForm() {
  const {
    name,
    address,
    region,
    city,
    phone,
    area,
    country,
    setName,
    setPhone,
    setCity,
    setAddress,
    setRegion,
    setArea,
    setCountry,
  } = useContext(CheckoutContext) as checkoutType;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setRegion(e.target.value);
            }}
            value={region}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code / Area"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={(e) => {
              setArea(e.target.value);
            }}
            value={area}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            value={country}
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
