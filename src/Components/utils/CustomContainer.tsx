import React, { useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setHoveredNavbar, setScrolled } from "../redux/reducers/swiperSlice";

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
  const dispatch = useDispatch();

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
  // : !isMobile ? "absolute" : "relative"
  return (
    <Box
      sx={{
        position: scrolled ? "fixed" : !isMobile ? "absolute" : "relative",
        top: scrolled ? 0 : "auto",
        zIndex: 10,
        width: "100%",
        "&:hover": {
          bgcolor: "#fff",
        },
        ...(scrolled
          ? {
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
              opacity: "100%",
              backdropFilter: "blur(15px)",
              backgroundColor: "#fff",
            }
          : {
              boxShadow: "0",
              backgroundColor: isNav ? "transparent" : "#fff",
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
