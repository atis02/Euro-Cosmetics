import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  TextField,
  Typography,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <>
      {/* Button to open the drawer */}
      <IconButton onClick={toggleDrawer(true)} sx={{ color: "#000" }}>
        <SearchIcon />
      </IconButton>

      {/* Drawer from top */}
      <Drawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            height: 250,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            boxShadow: 0,
          },
        }}
        transitionDuration={300}
      >
        <Box
          sx={{
            px: 4,
            py: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Search Products
          </Typography>
          <TextField
            autoFocus
            placeholder="Type to search..."
            variant="outlined"
            fullWidth
            sx={{
              width: "100%",
              maxWidth: 600,
              input: {
                fontSize: "1.1rem",
              },
            }}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default SearchDrawer;
