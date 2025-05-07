import React from "react";
import { Button, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import CustomContainer from "../../utils/CustomContainer";
import { rowSpaceStyle } from "../../utils/CustomStyles";
import { navs } from "./navs";
import NavbarIconsPath from "./NavbarIconsPath";
import Logo from "./Logo";
import { useSelector } from "react-redux";
const Navbar: React.FC = () => {
  const currentSlide = useSelector((state: any) => state.swiper.color);
  const currentTextColor = useSelector(
    (state: any) => state.swiper.colorNavbarText
  );
  const scrolled = useSelector((state: any) => state.swiper.scrolled);

  return (
    <CustomContainer borderBottom isNav>
      <Stack
        sx={{
          ...rowSpaceStyle,
        }}
      >
        <Logo />
        <Box>
          {navs.map((nav, index) => (
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
                padding: "5px 18px",
              }}
              component={Link}
              to={nav.to}
            >
              {nav.label}
            </Button>
          ))}
        </Box>
        <NavbarIconsPath />
      </Stack>
    </CustomContainer>
  );
};

export default Navbar;
