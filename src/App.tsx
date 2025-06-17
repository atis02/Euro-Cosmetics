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
import NotFoundPage from "./Components/Loyout/NotFoundPage";
import Brands from "./Pages/Brands";
import { ScrollToTop } from "./Components/utils/ScrollToTop";
import { IsMainPage } from "./Components/utils/IsMainPage";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <SWRConfig
      value={{
        fetcher,
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
          <ScrollToTop />
          <IsMainPage />
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
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brands/:brandId" element={<CategoryProducts />} />
            <Route path="/news/:statusName" element={<CategoryProducts />} />
            <Route path="/sales/:statusName" element={<CategoryProducts />} />
            <Route
              path="/category/:categoryName"
              element={<CategoryProducts />}
            />
            <Route
              path="/category/products/:statusName"
              element={<CategoryProducts />}
            />
            <Route
              path="/category/:categoryName/:subCategoryName"
              element={<CategoryProducts />}
            />
            <Route
              path="/category/:categoryName/:subCategoryName/:segmentName"
              element={<CategoryProducts />}
            />
            <Route
              path="/search/result/:searchedValue"
              element={<CategoryProducts />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Box>
    </SWRConfig>
  );
}

export default App;
