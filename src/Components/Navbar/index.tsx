import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import NavbarMobile from "./ui/NavbarMobile";
import Navbar from "./ui/Navbar";

const index: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return <Box>{isMobile ? <NavbarMobile /> : <Navbar />}</Box>;
};

export default index;
