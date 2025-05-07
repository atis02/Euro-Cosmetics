import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

interface CustomContainerProps {
  children: React.ReactNode;
  borderBottom?: boolean;
  isNav?: boolean;
}

const CustomContainerMain: React.FC<CustomContainerProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: "100%",

        padding: isMobile ? "10px 20px" : "15px 80px",
      }}
    >
      {children}
    </Box>
  );
};

export default CustomContainerMain;
