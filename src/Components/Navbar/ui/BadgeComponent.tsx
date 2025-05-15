import { Badge, Box } from "@mui/material";
import { FC } from "react";
import { mainColor } from "../../utils/CustomStyles";

interface Props {
  button: React.ReactNode;
  length: number;
}
export const CustomBadge: FC<Props> = ({ button, length }) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        "&:hover .MuiBadge-badge": {
          backgroundColor: mainColor,
        },
      }}
    >
      <Badge
        badgeContent={length}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "0.75rem",
            minWidth: 18,
            height: 18,
            lineHeight: 1,
            padding: "0 5px",
            transition: "background-color 0.3s ease",
          },
        }}
      >
        {button}
      </Badge>
    </Box>
  );
};
