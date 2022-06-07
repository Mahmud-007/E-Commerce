import React, { useContext } from "react";
import { NextPage } from "next";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import Layout from "../components/Layout";
import { StoreContext, StoreProvider } from "../utils/StoreContext";
import {
  productType,
  storeContextType,
  productContextType,
} from "../utils/types";
import { ProductContext } from "../utils/ProductContext";
import Image from "next/image";
import axios from "axios";

const Home: NextPage = () => {
  const { addToCart } = useContext(StoreContext) as storeContextType;
  const { productList } = useContext(ProductContext) as productContextType;

  const handleAddToCart = (product: productType) => {
    addToCart(product);
    console.log("product", product);
    axios.post(
      "http://localhost:8080/ecom/api/shop/update-cart",
      {
        productName: product.name,
        productPrice: product.price,
        productImage: product.image.src,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      }
    ).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
  };
  return (
    <div>
      <Layout title="Shop" />
      <h1>Products</h1>
      <Grid container spacing={3}>
        {productList.map(
          (product: { name: string; image: any; price: number }) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <CardActionArea>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width="400px"
                    height="400px"
                  />
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button
                    onClick={() => handleAddToCart(product as productType)}
                    size="small"
                    color="primary"
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  // const products = [
  //   {
  //     image: "https://www.scorebat.com/og/m/og1152402.jpeg",
  //     name: "first",
  //     price: 100,
  //     slug: null,
  //   },
  //   {
  //     image: "https://www.scorebat.com/og/m/og1152402.jpeg",
  //     name: "second",
  //     price: 200,
  //     slug: null,
  //   },
  //   {
  //     image: "https://www.scorebat.com/og/m/og1152402.jpeg",
  //     name: "first",
  //     price: 300,
  //     slug: null,
  //   },
  // ];

  return {
    props: {
      products: [],
    },
  };
};
function handleAddToCart(
  arg0: productType
): React.MouseEventHandler<HTMLButtonElement> | undefined {
  throw new Error("Function not implemented.");
}
