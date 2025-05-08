import { Box, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { KeyboardArrowLeftOutlined } from "@mui/icons-material";
import { rowSpaceStyle } from "../../../utils/CustomStyles";

interface CategoryDrawer {
  open: boolean;
  onClose: () => void;
}

export const NavbarCategoryMobile: FC<CategoryDrawer> = ({ open, onClose }) => {
  return (
    <Stack pt={4}>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        ModalProps={{
          BackdropProps: {
            sx: {
              top: "60px",
              backgroundColor: "rgba(0, 0, 0, 0)",
              boxShadow: "none",
            },
          },
        }}
        SlideProps={{
          timeout: {
            enter: 600,
            exit: 400,
          },
        }}
        PaperProps={{
          sx: {
            position: "fixed",
            top: "60px", // Height of your navbar
            height: "calc(100% - 60px)",
            boxShadow: "none",
          },
        }}
        sx={{
          position: "fixed",
          top: "60px",
        }}
      >
        <Box
          sx={{
            width: "100vw",
            padding: 2,
          }}
          role="presentation"
          //   onClick={() => setCategoryDrawerOpen(false)}
          //   onKeyDown={() => setCategoryDrawerOpen(false)}
        >
          <Stack sx={rowSpaceStyle}>
            <IconButton onClick={onClose}>
              <KeyboardArrowLeftOutlined />
            </IconButton>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 500,
                textTransform: "lowercase",
                fontFamily: "Graphic",
                ml: -2,
              }}
            >
              каталог
            </Typography>
            <Stack></Stack>
          </Stack>
        </Box>
      </Drawer>
    </Stack>
  );
};
