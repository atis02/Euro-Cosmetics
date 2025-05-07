import React from "react";
import {
  SearchOutlined,
  FavoriteBorderOutlined,
  AccountCircleOutlined,
  LocalMallOutlined,
  Menu,
} from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { navIconStyles } from "../../utils/CustomStyles";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useSelector } from "react-redux";

interface isMobileProps {
  isMobile?: boolean;
  toggleDrawer?: () => void;
  onClose?: () => void;
  drawerOpen?: boolean;
}
const NavbarIconsPath: React.FC<isMobileProps> = ({
  isMobile,
  drawerOpen = false,
  toggleDrawer,
  onClose,
}) => {
  const iconsPath = [
    {
      icon: <Menu sx={navIconStyles} />,
      link: "/",
      isMobile: true,
      func: drawerOpen ? onClose : toggleDrawer,
    },
    {
      icon: <SearchOutlined sx={navIconStyles} />,
      link: "/search",
      isMobile: false,
    },

    {
      icon: <Logo isMobile={isMobile} />,
      link: "/",
      isMobile: true,
    },
    {
      icon: <FavoriteBorderOutlined sx={navIconStyles} />,
      link: "/favorites",
      isMobile: false,
    },
    {
      icon: <AccountCircleOutlined sx={navIconStyles} />,
      link: "/account",
      isMobile: false,
    },
    {
      icon: <LocalMallOutlined sx={navIconStyles} />,
      link: "/cart",
      isMobile: false,
    },
  ];
  const currentSlide = useSelector((state: any) => state.swiper.color);
  const currentTextColor = useSelector(
    (state: any) => state.swiper.colorNavbarText
  );
  console.log(isMobile);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      flexGrow={isMobile ? 1 : 0}
      gap={3}
    >
      {!isMobile
        ? iconsPath
            .filter((item) => item.isMobile == false)
            .map((icon, index) => (
              <Link
                key={index}
                style={{ color: currentTextColor ? "#000" : currentSlide }}
                to={icon.link}
              >
                {icon.icon}
              </Link>
            ))
        : iconsPath
            .filter((item) => item.link !== "/account")
            .map((icon, index) => {
              const isMenu = icon.icon.type === Menu;
              return isMenu ? (
                <Box
                  key={index}
                  onClick={() => {
                    if (icon.func) icon.func();
                  }}
                  sx={{
                    cursor: "pointer",
                    color: isMobile
                      ? "#000"
                      : currentTextColor
                      ? "#000"
                      : currentSlide,
                  }}
                >
                  {icon.icon}
                </Box>
              ) : (
                <Link
                  key={index}
                  to={icon.link}
                  style={{
                    color: isMobile
                      ? "#000"
                      : currentTextColor
                      ? "#000"
                      : currentSlide,
                  }}
                >
                  {icon.icon}
                </Link>
              );
            })}
    </Stack>
  );
};

export default NavbarIconsPath;
