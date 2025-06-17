import React from "react";
import {  Typography} from "@mui/material";
import { mainColor } from "./CustomStyles";

interface CustomContainerProps {
  text: string|number
}

export const CustomPagesText: React.FC<CustomContainerProps> = ({
  text,
}) => {


  return (
    <Typography
      color="#000"
      fontSize={{ lg: 50, md: 50, sm: 30, xs: 25 }}
      sx={{
        "&:hover": { color: mainColor },
        cursor: "pointer",
        fontFamily: "Graphic",
        fontWeight: 500,
      }}
    >{text}</Typography>
  );
};
