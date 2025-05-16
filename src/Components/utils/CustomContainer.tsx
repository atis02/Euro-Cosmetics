import React, { useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setHoveredNavbar, setScrolled } from "../redux/reducers/swiperSlice";
import { useLocation } from "react-router-dom";

interface CustomContainerProps {
  children: React.ReactNode;
  borderBottom?: boolean;
  isNav?: boolean;
}

const CustomContainer: React.FC<CustomContainerProps> = ({
  children,
  borderBottom,
  isNav,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const currentSlide = useSelector((state: any) => state.swiper.color);
  const scrolled = useSelector((state: any) => state.swiper.scrolled);
  const open = useSelector((state: any) => state.swiper.openSearch);

  const dispatch = useDispatch();

  const { pathname } = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        dispatch(setScrolled(true));
      } else {
        dispatch(setScrolled(false));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const notMainPage = pathname === "/";

  return (
    <Box
      sx={{
        position:
          scrolled && isNav
            ? "fixed"
            : !isMobile && isNav
            ? "absolute"
            : "relative",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        width: "100%",
        "&:hover": {
          bgcolor: "#fff",
        },
        color: open
          ? "#000"
          : notMainPage
          ? "transparent"
          : currentSlide
          ? "#000"
          : "#fff",
        ...(scrolled
          ? {
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
              opacity: "100%",
              backdropFilter: "blur(15px)",
              backgroundColor: "#fff",
            }
          : {
              boxShadow: "0",
              backgroundColor: open
                ? "#fff"
                : notMainPage
                ? "transparent"
                : isNav
                ? "transparent"
                : "#fff",
            }),
        transition:
          "background-color 0.8s ease-in-out, transform 0.3s ease-in-out",
        padding: isMobile ? "10px 20px" : "15px 40px 0 40px",
        borderBottom:
          borderBottom && currentSlide
            ? "0.5px solid #c6b09f4d"
            : "0.5px solid #e6e5e5",

        display: "flex",
        flexDirection: "column",
        opacity: 0.95,
      }}
      onMouseEnter={() => isNav && dispatch(setHoveredNavbar(true))}
      onMouseLeave={() => isNav && dispatch(setHoveredNavbar(false))}
    >
      {children}
    </Box>
  );
};

export default CustomContainer;
