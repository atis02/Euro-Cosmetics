import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

interface CustomContainerProps {
  children: React.ReactNode;
  borderBottom?: boolean;
}

const ContainerMobile: React.FC<CustomContainerProps> = ({
  children,
  borderBottom,
}) => {
  const [scrolled, setScrolled] = useState(false);

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
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100%",
        color: "#000",
        ...(scrolled
          ? {
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
              opacity: "100%",
              backdropFilter: "blur(15px)",
              backgroundColor: "#fff",
            }
          : {
              boxShadow: "none",
              backgroundColor: "#fff",
            }),
        transition:
          "background-color 0.8s ease-in-out, transform 0.3s ease-in-out",
        padding: "10px 20px",
        borderBottom: borderBottom
          ? "0.5px solid #c6b09f4d"
          : "0.5px solid #e6e5e5",
      }}
    >
      {children}
    </Box>
  );
};

export default ContainerMobile;
