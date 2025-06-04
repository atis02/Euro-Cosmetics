import React, { useState } from "react";
import { Button, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import CustomContainer from "../../utils/CustomContainer";
import { rowSpaceStyle } from "../../utils/CustomStyles";
import { navs } from "./navs";
import NavbarIconsPath from "./NavbarIconsPath";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import CategoriesComponent from "./NavCategories/index";

const Navbar: React.FC = () => {
  const [openNavCategory, setOpenNavCategory] = useState(false);

  const currentSlide = useSelector((state: any) => state.swiper.color);
  const currentTextColor = useSelector(
    (state: any) => state.swiper.colorNavbarText
  );
  const scrolled = useSelector((state: any) => state.swiper.scrolled);
  const onOpen = () => setOpenNavCategory(true);
  const onClose = () => setOpenNavCategory(false);

  return (
    <CustomContainer borderBottom>
      <Stack
        sx={{
          ...rowSpaceStyle,
        }}
      >
        <Logo />
        <Box>
          {navs.map((nav, index) =>
            nav.type === "category" ? (
              <>
                <Button
                  key={index}
                  color="inherit"
                  sx={{
                    color: scrolled
                      ? "#000"
                      : currentTextColor
                      ? "#000"
                      : currentSlide,
                    fontSize: 16,
                    fontWeight: 400,
                    textTransform: "lowercase",
                    fontFamily: "Graphic",
                    padding: "5px 18px 15px 18px",
                    "&:hover": {
                      borderRadius: 0,
                      borderBottom: "2px solid #1E1E1E",
                    },
                  }}
                  onMouseEnter={onOpen}
                  onMouseLeave={onClose}
                >
                  каталог
                </Button>
                {openNavCategory && (
                  <Box
                    onMouseEnter={onOpen}
                    onMouseLeave={onClose}
                    sx={{
                      position: "absolute",
                      top: 63,
                      left: 0,
                      py: 4,
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                      border: "1px solid #ddd",
                      zIndex: 1000,
                      height: "100%",
                      minHeight: "100vh",
                      minWidth: "99.9%",
                      overflow: "auto",
                      alignItems: "center",
                    }}
                  >
                    <CategoriesComponent onClose={onClose} />
                  </Box>
                )}
              </>
            ) : (
              <Button
                key={index}
                color="inherit"
                sx={{
                  color: scrolled
                    ? "#000"
                    : currentTextColor
                    ? "#000"
                    : currentSlide,
                  fontSize: 16,
                  fontWeight: 400,
                  textTransform: "lowercase",
                  fontFamily: "Graphic",
                  padding: "5px 18px 15px 18px",
                }}
                component={Link}
                to={nav.to}
              >
                {nav.label}
              </Button>
            )
          )}
        </Box>
        <NavbarIconsPath />
      </Stack>
    </CustomContainer>
  );
};

export default Navbar;
