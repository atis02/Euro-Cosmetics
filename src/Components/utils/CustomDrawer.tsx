import React from "react";
import { Drawer, Box } from "@mui/material";

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
  anchor?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
  width?: string | number;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  open,
  onClose,
  anchor = "right",
  children,
  width = "100%",
}) => {
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Box
        sx={{
          minWidth: width,
          padding: { lg: 6, md: 6, sm: 6, xs: 2 },
          pt: 2,
          mb: 2,
          position: "relative",
          height: "100%",
        }}
      >
        <Box>{children}</Box>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
