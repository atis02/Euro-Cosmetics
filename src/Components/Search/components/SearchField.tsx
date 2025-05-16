import { East } from "@mui/icons-material";
import { Box, IconButton, InputBase } from "@mui/material";
import { FC } from "react";
import { ChangeEvent } from "./interfaces";
import { useTypewriter } from "react-simple-typewriter";

interface Props {
  shrink: boolean;
  searchValue: string;
  handleChange: (event: ChangeEvent) => void;
  isMobile: boolean | undefined;
}

export const SearchField: FC<Props> = ({
  shrink,
  searchValue,
  handleChange,
  isMobile,
}) => {
  const fontSizeMob = 28;
  const fontSizeMobileShrink = 33;
  const fontSizeDesktopShrink = 45;
  const [text] = useTypewriter({
    words: [
      "хочу купить",
      "наушники",
      "сыворотка для кожи",
      "массажер для глаз",
      "часы",
    ],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });
  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: isMobile ? "start" : "flex-end",
        gap: 2,
        height: shrink ? 70 : 100,
        transition: "height 0.3s ease",
      }}
    >
      <InputBase
        autoFocus
        placeholder={searchValue ? "" : text}
        sx={{
          flex: 1,
          maxWidth: isMobile ? "100%" : "50%",
          padding: "0 12px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          transition: "padding 0.3s ease",

          "& input": {
            fontSize: shrink
              ? fontSizeMob
              : isMobile
              ? fontSizeMobileShrink
              : fontSizeDesktopShrink,
            transition: "font-size 0.3s ease",
            color: "#000",
            fontFamily: "Graphic",
            fontWeight: 500,
          },
          "& input::placeholder": {
            fontSize: shrink
              ? fontSizeMob
              : isMobile
              ? fontSizeMobileShrink
              : fontSizeDesktopShrink,
            transition: "font-size 0.3s ease",
            color: "#999",
            fontFamily: "Graphic",
            fontWeight: 500,
          },
          "& input:focus::placeholder, & input:hover::placeholder": {
            color: "#000",
          },
        }}
        value={searchValue}
        onChange={handleChange}
      />

      <IconButton
        sx={{
          ml: 2,
          transition: "transform 0.3s ease",
          transform: shrink ? "scale(0.8)" : "scale(1)",
        }}
      >
        <East
          sx={{
            fontSize: shrink ? 30 : 40,
            color: searchValue ? "#000" : "#999",
            transition: "font-size 0.3s ease",
          }}
        />
      </IconButton>
    </Box>
  );
};
