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
import { useDispatch, useSelector } from "react-redux";
import Search from "../../Search";
import { setOpenCart, setOpenSearch } from "../../redux/reducers/swiperSlice";
import { CustomBadge } from "./BadgeComponent";
import ShopCart from "../../../Pages/ShopCart";
import Language from "../../Language/Language";

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
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.swiper.openSearch);
  const favorites = useSelector((state: any) => state.favorites.items);
  const cartItems = useSelector((state: any) => state.cart.items);

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
      func: open
        ? () => dispatch(setOpenSearch(false))
        : () => dispatch(setOpenSearch(true)),
    },

    {
      icon: <Logo isMobile={isMobile} />,
      link: "/",
      isMobile: true,
    },
    {
      icon: (
        <CustomBadge
          length={favorites.length}
          button={<FavoriteBorderOutlined sx={navIconStyles} />}
        />
      ),
      link: "/wishlist",
      isMobile: false,
    },
    {
      icon: <AccountCircleOutlined sx={navIconStyles} />,
      link: "/account",
      isMobile: false,
    },
    {
      icon: (
        <CustomBadge
          length={cartItems.length}
          button={<LocalMallOutlined sx={navIconStyles} />}
        />
      ),
      link: "",
      isMobile: false,
      func: () => dispatch(setOpenCart(true)),
    },
  ];
  const currentSlide = useSelector((state: any) => state.swiper.color);
  const currentTextColor = useSelector(
    (state: any) => state.swiper.colorNavbarText
  );
  const scrolled = useSelector((state: any) => state.swiper.scrolled);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexGrow={isMobile ? 1 : 0}
        gap={3}
        pb={0.5}
        pt={0.5}
      >
        {!isMobile
          ? iconsPath
              .filter((item) => item.isMobile == false)
              .map((icon, index) =>
                icon.func ? (
                  <IconButton
                    key={index}
                    sx={{
                      color: scrolled
                        ? "#000"
                        : currentTextColor
                        ? "#000"
                        : currentSlide,
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
                    style={{
                      color: scrolled
                        ? "#000"
                        : currentTextColor
                        ? "#000"
                        : currentSlide,
                    }}
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
                        : scrolled
                        ? "#000"
                        : currentTextColor
                        ? "#000"
                        : currentSlide,
                    }}
                  >
                    {icon.icon}
                  </Box>
                ) : icon.func ? (
                  <IconButton
                    key={index}
                    sx={{
                      color: isMobile
                        ? "#000"
                        : scrolled
                        ? "#000"
                        : currentTextColor
                        ? "#000"
                        : currentSlide,
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
                    style={{
                      color: isMobile
                        ? "#000"
                        : scrolled
                        ? "#000"
                        : currentTextColor
                        ? "#000"
                        : currentSlide,
                    }}
                    to={icon.link !== "" ? icon.link : ""}
                  >
                    {icon.icon}
                  </Link>
                );
              })}
      </Stack>
      <Language />
      <Search isMobile={isMobile} />
      <ShopCart />
    </>
  );
};

export default NavbarIconsPath;
