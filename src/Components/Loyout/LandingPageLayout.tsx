import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function LandingPageLayout() {
  return (
    <Box>
      <Toaster />
      <Outlet />
    </Box>
  );
}
