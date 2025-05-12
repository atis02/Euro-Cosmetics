import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

interface CustomContainerProps {
  children: React.ReactNode;
}

export const CustomContainerAll: React.FC<CustomContainerProps> = ({
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: "100%",
        mt: "75px",
        padding: isMobile ? "10px 20px" : "15px 40px 0 40px",
        display: "flex",
        flexDirection: "column",
        opacity: 0.95,
      }}
    >
      {children}
    </Box>
  );
};
