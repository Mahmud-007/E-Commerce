import React from "react";
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
import NextLink from "next/link";
import Layout from "../components/Layout";
const Home: NextPage = ({ products }) => {
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map(
            (product: {
              name:
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.Key
                | null
                | undefined;
              slug: any;
              image: string | undefined;
              price:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <Grid item md={4} key={product.name}>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={product.image}
                        title={product.name}
                      ></CardMedia>
                      <CardContent>
                        <Typography>{product.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Typography>${product.price}</Typography>
                      <Button size="small" color="primary">
                        Add to cart
                      </Button>
                    </CardActions>
                  </Card>
                </NextLink>
              </Grid>
            )
          )}
        </Grid>
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const products = [
    {
      image: "https://www.scorebat.com/og/m/og1152402.jpeg",
      name: "first",
      price: 100,
      slug: null,
    },
    {
      image: "https://www.scorebat.com/og/m/og1152402.jpeg",
      name: "first",
      price: 100,
      slug: null,
    },
    {
      image: "https://www.scorebat.com/og/m/og1152402.jpeg",
      name: "first",
      price: 100,
      slug: null,
    },
  ];
  return {
    props: {
      products: products,
    },
  };
};
