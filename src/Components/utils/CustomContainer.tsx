import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setHoveredNavbar, setScrolled } from "../redux/reducers/swiperSlice";

interface CustomContainerProps {
  children: React.ReactNode;
  borderBottom?: boolean;
}

const CustomContainer: React.FC<CustomContainerProps> = ({
  children,
  borderBottom,
}) => {
  const [scrolled, setScrolledNav] = useState(false);
  const currentSlide = useSelector((state: any) => state.swiper.color);
  const open = useSelector((state: any) => state.swiper.openSearch);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolledNav(true);
        dispatch(setScrolled(true));
      } else {
        setScrolledNav(false);
        dispatch(setScrolled(false));
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
        position: scrolled ? "fixed" : "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100%",
        "&:hover": {
          bgcolor: "#fff",
        },
        color: open ? "#000" : currentSlide ? "#000" : "transparent",
        ...(scrolled
          ? {
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
              opacity: "100%",
              backdropFilter: "blur(15px)",
              backgroundColor: "#fff",
            }
          : {
              boxShadow: "0",
              backgroundColor: open ? "#fff" : "transparent",
            }),
        transition:
          "background-color 0.8s ease-in-out, transform 0.3s ease-in-out",
        padding: "15px 40px 0 40px",
        borderBottom:
          borderBottom && currentSlide
            ? "0.5px solid #c6b09f4d"
            : "0.5px solid #e6e5e5",
            overflow: "auto",
      }}
      onMouseEnter={() => dispatch(setHoveredNavbar(true))}
      onMouseLeave={() => dispatch(setHoveredNavbar(false))}
    >
      {children}
    </Box>
  );
};

export default CustomContainer;
