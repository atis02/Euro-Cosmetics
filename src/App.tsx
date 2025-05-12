import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import { Login } from "./Components/Login";
import { Box } from "@mui/material";
import Navbar from "./Components/Navbar";
import Footer from "./Pages/Footer";
import { Toaster } from "react-hot-toast";
import Product from "./Pages/Product";

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
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;
