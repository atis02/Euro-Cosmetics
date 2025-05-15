import {
  Box,
  Stack,
  Drawer,
  ListItem,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import CustomContainer from "../../../utils/CustomContainer";
import { rowSpaceStyle } from "../../../utils/CustomStyles";
import { navs } from "../navs";
import NavbarIconsPath from "../NavbarIconsPath";
import { Link } from "react-router-dom";
import { NavigateNextOutlined } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { NavbarCategoryMobile } from "./NavbarCategoryMobile";

const NavbarMobile: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const toggleDrawer = () => () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <CustomContainer borderBottom isNav>
      <Stack
        sx={{
          ...rowSpaceStyle,
        }}
      >
        <Stack pt={4}>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer()}
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
            <AnimatePresence>
              {drawerOpen && !categoryDrawerOpen && (
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Box
                    sx={{
                      width: "100vw",
                      padding: 2,
                    }}
                    role="presentation"
                    //   onClick={() => setDrawerOpen(false)}
                    //   onKeyDown={() => setDrawerOpen(false)}
                  >
                    <Stack>
                      {navs.map((nav, index) => (
                        <ListItem
                          key={index}
                          component={Link}
                          sx={{
                            padding: "5px 5px",
                          }}
                          to={isMobile && nav.label == "каталог" ? "/" : nav.to}
                          onClick={() => {
                            if (nav.label === "каталог") {
                              setCategoryDrawerOpen(true);
                            }
                          }}
                        >
                          {nav.image ? (
                            <img
                              src={nav.image}
                              style={{ width: 62, height: 49 }}
                              alt=""
                            />
                          ) : (
                            ""
                          )}
                          <Typography
                            sx={{
                              fontSize: 26,
                              fontWeight: 500,
                              textTransform: "lowercase",
                              fontFamily: "Graphic",
                              color: nav.color ? nav.color : "#000",
                            }}
                          >
                            {nav.label}
                          </Typography>
                          {nav.label === "каталог" && (
                            <Stack width="100%" alignItems="end">
                              <NavigateNextOutlined sx={{ color: "#000" }} />
                            </Stack>
                          )}
                        </ListItem>
                      ))}
                    </Stack>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Drawer>
        </Stack>

        <NavbarIconsPath
          isMobile
          drawerOpen={drawerOpen}
          toggleDrawer={() => {
            setDrawerOpen(true);
            setCategoryDrawerOpen(false);
          }}
          onClose={() => setDrawerOpen(false)}
          open={open}
          setOpen={setOpen}
        />
        <NavbarCategoryMobile
          open={categoryDrawerOpen}
          onClose={() => {
            setDrawerOpen(true);
            setCategoryDrawerOpen(false);
          }}
        />
      </Stack>
    </CustomContainer>
  );
};

export default NavbarMobile;
