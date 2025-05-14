import { East } from "@mui/icons-material";
import { Box, IconButton, InputBase } from "@mui/material";
import { FC } from "react";
import { ChangeEvent } from "./interfaces";

interface Props {
  shrink: boolean;
  searchValue: string;
  handleChange: (event: ChangeEvent) => void;
  style?: React.CSSProperties;
}

export const SearchField: FC<Props> = ({
  shrink,
  searchValue,
  handleChange,
  style,
}) => {
  return (
    <Box
      sx={{
        px: 4,
        py: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 2,
      }}
    >
      <InputBase
        autoFocus
        placeholder="хочу купить"
        fullWidth
        sx={{
          width: "100%",
          maxWidth: "50%",
          fontSize: "1.1rem",
          padding: shrink ? "6px 12px" : "14px 16px",
          transition: "padding 0.3s ease",
          height: 60,
          "& input": {
            fontSize: "60px",
            color: "#000",
            fontStyle: "Graphic",
          },
          "& input::placeholder": {
            color: "#d9d9d9",
            fontStyle: "Graphic",
            fontSize: "60px",
            fontWeight: 600,
          },
          "& input:focus::placeholder": {
            color: "#999",
          },
          "& input:hover::placeholder": {
            color: "#999",
          },
          ...style,
        }}
        value={searchValue}
        onChange={handleChange}
      />

      <IconButton>
        <East sx={{ fontSize: 40, color: searchValue ? "#999" : "#d9d9d9" }} />
      </IconButton>
    </Box>
  );
};
