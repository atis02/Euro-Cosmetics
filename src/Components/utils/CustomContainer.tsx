import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setHoveredNavbar } from "../redux/reducers/swiperSlice";

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
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const currentSlide = useSelector((state: any) => state.swiper.color);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
 
    };
  }, []);

  return (
    <Box
      sx={{
        position: !isMobile
          ? "absolute"
          : scrolled && isNav
          ? "sticky"
          : "relative",
        top: scrolled && isNav ? 0 : "auto",
        zIndex: 10,
        width: "100%",
        "&:hover": {
          bgcolor: "#fff",
        },
        ...(scrolled
          ? {
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
              opacity: "100%",
              backdropFilter: "blur(10px)",
            }
          : {
              boxShadow: "0",
              backgroundColor: isNav ? "transparent" : "#fff",
            }),
        transition:
          "background-color 0.8s ease-in-out, transform 0.3s ease-in-out",
        padding: isMobile ? "10px 20px" : "15px 40px",
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
