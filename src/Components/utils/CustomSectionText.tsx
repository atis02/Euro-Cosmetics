import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { mainColor } from "./CustomStyles";

type Props = {
  text: string;
  sx?: {
    transform: string;
  };
  fz?: number;
};

const CustomSectionText: FC<Props> = ({ fz, text, sx }) => {
  return (
    <Stack
      alignItems="center"
      // // justifyContent="space-between"
      // direction="row"
    >
      <Stack></Stack>
      <Typography
        color="#000"
        fontSize={{ lg: fz, md: 35, sm: 30, xs: 25 }}
        sx={{
          "&:hover": { color: mainColor },
          cursor: "pointer",
          fontFamily: "Graphic",
          fontWeight: 500,
          sx,
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

export default CustomSectionText;
