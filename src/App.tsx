import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import { Login } from "./Components/Login";
import { Box } from "@mui/material";
import Navbar from "./Components/Navbar";
import Footer from "./Pages/Footer";
import { Toaster } from "react-hot-toast";
import Product from "./Pages/Product";
import FavoriteProducts from "./Pages/Favourites";
import ShopCart from "./Pages/ShopCart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/wishlist" element={<FavoriteProducts />} />
          <Route path="/cart" element={<ShopCart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;
