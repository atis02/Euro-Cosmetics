import { Button, Typography } from "@mui/material";
import { mainColor } from "./CustomStyles";
import { FC } from "react";

interface Props {
  isMobile: boolean;
  func:()=>void
}
const CustomFilterButton: FC<Props> = ({ isMobile ,func}) => {
  return (
    <Button
      sx={{
        textTransform: "lowercase",
        color: "#000",
        gap: 1.5,
        "& svg path": {
          fill: "#000",
          transition: "fill 0.3s ease",
        },
        "& .MuiTypography-root": {
          color: "#000",
          transition: "color 0.3s ease",
        },
        "&:hover svg path": {
          fill: mainColor,
        },
        "&:hover .MuiTypography-root": {
          color: mainColor,
        },
      }}
      onClick={func}
    >
      <svg viewBox="0 0 20 18" style={{ width: 20, height: 20 }}>
        <path
          fillRule="evenodd"
          stroke="none"
          d="M19.5 14.623h-3.94a3.124 3.124 0 0 1-6.12 0H.5v-1.245h8.94a3.124 3.124 0 0 1 6.12 0h3.94v1.245ZM10.622 14a1.878 1.878 0 1 0 3.755 0 1.878 1.878 0 0 0-3.755 0Z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          stroke="none"
          d="M.5 4.623V3.378h3.94a3.124 3.124 0 0 1 6.12 0h8.94v1.245h-8.94a3.124 3.124 0 0 1-6.12 0H.5ZM5.622 4a1.878 1.878 0 1 0 3.755 0 1.878 1.878 0 0 0-3.755 0Z"
          clipRule="evenodd"
        />
      </svg>
      {isMobile ? "" : <Typography>фильтры</Typography>}
    </Button>
  );
};

export default CustomFilterButton;
