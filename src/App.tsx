import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import { Login } from "./Components/Login";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "./Components/Navbar";
import Footer from "./Pages/Footer";
import { Toaster } from "react-hot-toast";
import Product from "./Pages/Product";
import FavoriteProducts from "./Pages/Favourites";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from "swr";
import { fetcher } from "./Fetcher/swrConfig";
import CategoryProducts from "./Pages/CategoryProducts";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <SWRConfig
      value={{
        fetcher,
        refreshInterval: 5000,
        shouldRetryOnError: true,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BrowserRouter>
          <Navbar />
          <Toaster />
          {isMobile ? (
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar
              closeOnClick
              pauseOnHover
              theme="dark"
            />
          ) : (
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar
              closeOnClick
              pauseOnHover
              theme="dark"
              style={{ top: "70px" }}
            />
          )}

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/wishlist" element={<FavoriteProducts />} />
            <Route path="/:category" element={<CategoryProducts />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Box>
    </SWRConfig>
  );
}

export default App;
