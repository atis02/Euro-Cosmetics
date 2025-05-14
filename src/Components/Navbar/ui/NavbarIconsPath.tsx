import React from "react";
import {
  SearchOutlined,
  FavoriteBorderOutlined,
  AccountCircleOutlined,
  LocalMallOutlined,
  Menu,
  Close,
} from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { navIconStyles } from "../../utils/CustomStyles";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import Search from "../../Search/";

interface isMobileProps {
  isMobile?: boolean;
  toggleDrawer?: () => void;
  onClose?: () => void;
  drawerOpen?: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
}
const NavbarIconsPath: React.FC<isMobileProps> = ({
  isMobile,
  drawerOpen = false,
  toggleDrawer,
  onClose,
  open,
  setOpen,
}) => {
  const iconsPath = [
    {
      icon: <Menu sx={navIconStyles} />,
      link: "/",
      isMobile: true,
      func: drawerOpen ? onClose : toggleDrawer,
    },
    {
      icon: open ? (
        <Close sx={navIconStyles} />
      ) : (
        <SearchOutlined sx={navIconStyles} />
      ),
      link: "",
      isMobile: false,
      func: open ? () => setOpen(false) : () => setOpen(true),
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
            .map((icon, index) =>
              icon.func ? (
                <IconButton
                  key={index}
                  sx={{
                    color: currentTextColor ? "#000" : currentSlide,
                    p: 0,
                  }}
                  onClick={() => {
                    if (icon.func) icon.func();
                  }}
                >
                  {icon.icon}
                </IconButton>
              ) : (
                <Link
                  key={index}
                  style={{ color: currentTextColor ? "#000" : currentSlide }}
                  to={icon.link !== "" ? icon.link : ""}
                >
                  {icon.icon}
                </Link>
              )
            )
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
                  to={icon.link !== "" ? icon.link : ""}
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
      <Search open={open} toggleDrawer={() => setOpen(false)} />
    </Stack>
  );
};

export default NavbarIconsPath;
