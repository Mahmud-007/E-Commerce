import React, { useContext, useState, useEffect } from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
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
import Modal from "@mui/material/Modal";
import Layout from "../components/Layout";
import { StoreContext, StoreProvider } from "../context/StoreContext";
import {
  productType,
  storeContextType,
  productContextType,
} from "../utils/types";
import { ProductContext } from "../context/ProductContext";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const defaultProduct: productType = {
  id: 0,
  image: undefined,
  name: "",
  price: 0,
  quantity: 0,
};

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [product, setProducts] = useState<productType[]>([]);
  const [modalProduct, setModalProduct] = useState<productType>(defaultProduct);

  const { addToCart, getCart } = useContext(StoreContext) as storeContextType;
  const { productList } = useContext(ProductContext) as productContextType;
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalHandler = (product: any) => {
    console.log({ product });
    setModalProduct(product);
    handleOpen();
  };

  const handleAddToCart = (item: productType) => {
    addToCart(item, item.id, 1);
    setTimeout(getCart, 500);
  };

  const getProducts = async () => {
    await axios
      .get("http://localhost:8080/ecom/api/shop/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      })
      .then((res) => {
        console.log("res", res.data);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProducts();
    const user = localStorage.getItem("User");
    // if (!user) {
    //   router.push("/signin");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Layout title="Shop" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalProduct.name}
          </Typography> */}
          <h2>{modalProduct.name}</h2>
          <Image
            src={modalProduct.image}
            alt={modalProduct.name}
            width="400px"
            height="400px"
          />
          <Typography>Price: ${modalProduct.price}</Typography>
        </Box>
      </Modal>
      <div style={{ marginTop: "100px" }}>
        <h1>Products</h1>
        <Grid
          container
          spacing={10}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          {product.map(
            (product: {
              [x: string]: any;
              name: string;
              image: any;
              price: number;
            }) => (
              <Grid item md={3} key={product.name} justifyContent="center">
                <Card>
                  <CardActionArea>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width="500px"
                      height="450px"
                      onClick={() => modalHandler(product)}
                    />
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Typography>${product.price}</Typography>
                    <Button
                      onClick={() =>
                        handleAddToCart(product as productType)
                      }
                      size="small"
                      color="primary"
                    >
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
                {/* <Card >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://picsum.photos/200/300"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </CardActions>
              </Card> */}
              </Grid>
            )
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  return {
    props: {
      products: [],
    },
  };
};
