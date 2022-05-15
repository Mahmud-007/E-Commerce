import {
  AppBar,
  Badge,
  Container,
  createTheme,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NextLink from "next/link";
import React, { useContext } from "react";
import useStyles from "../utils/styles";
import Cookies from "js-cookie";

interface Props {
  title?: string;
  description?: string;
}

const Layout: React.FC<Props> = ({ title, description, children }) => {
  const router = useRouter();
  const [darkMode, setdarkMode] = useState(true);
  const [userInfo,setUserInfo] = useState(true);

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Next TS E-commerce` : "Next TS E-commerce"}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <div className={classes.parent}>
          <AppBar position="static" className={classes.navbar}>
            <Toolbar>
              <NextLink href="/" passHref>
                <Link>
                  <Typography className={classes.brand}>
                    Next TS E-commerce
                  </Typography>
                </Link>
              </NextLink>
              <div className={classes.grow}></div>
              <div>
                <NextLink href="/cart" passHref>
                  <Link>
                    <Badge
                      color="secondary"
                    >
                      Cart
                    </Badge>
                  </Link>
                </NextLink>
                {userInfo ? (
                  <>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      className={classes.navbarButton}
                    >UserName</Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                    >
                      <MenuItem>Profile</MenuItem>
                      <MenuItem >
                        Order History
                      </MenuItem>
                      <MenuItem >Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <NextLink href="/login" passHref>
                    <Link>Login</Link>
                  </NextLink>
                )}
              </div>
            </Toolbar>
          </AppBar>
          <Container className={classes.main}>{children!}</Container>
          <footer className={classes.footer}>
            <Typography>All rights resesrved. Next TS E-commerce</Typography>
          </footer>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
