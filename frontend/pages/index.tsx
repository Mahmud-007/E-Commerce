import React, { useContext, useState } from "react";
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
import ProductModal from "../components/ProductModal";

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalProduct, setModalProduct] = useState<productType>(defaultProduct);

  const { addToCart } = useContext(StoreContext) as storeContextType;
  const { productList } = useContext(ProductContext) as productContextType;

  const handleAddToCart = (product: productType) => {
    addToCart(product);
    console.log("product", product);
    axios
      .post(
        "http://localhost:8080/ecom/api/shop/update-cart",
        {
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          productImage: product.image.src,
          productQuantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const modalHandler = (product: any) => {
    console.log({ product });
    setModalProduct(product);
    handleOpen();
  };
  return (
    <div>
      <Layout title="Shop" />
      <h1>Products</h1>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalProduct.name}
          </Typography>
          <Typography>
            <Image
              src={modalProduct.image}
              alt={modalProduct.name}
              width="400px"
              height="400px"
            />
            ${modalProduct.price}
          </Typography>
        </Box>
      </Modal>
      <Grid container spacing={2}>
        {productList.map(
          (product: { name: string; image: any; price: number }) => (
            <Grid item md={3} key={product.name} justifyContent="center">
              <Card>
                <CardActionArea>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width="400px"
                    height="400px"
                    onClick={() => modalHandler(product)}
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
