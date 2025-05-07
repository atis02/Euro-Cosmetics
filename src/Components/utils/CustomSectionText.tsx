import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { mainColor } from "./CustomStyles";

type Props = {
  text: string;
};

const CustomSectionText: FC<Props> = ({ text }) => {
  return (
    <Stack
      alignItems="center"
      // // justifyContent="space-between"
      // direction="row"
    >
      <Stack></Stack>
      <Typography
        color="#000"
        fontSize={{ lg: 35, md: 35, sm: 30, xs: 25 }}
        sx={{
          "&:hover": { color: mainColor },
          cursor: "pointer",
          fontFamily: "Graphic",
          fontWeight: 500,
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

export default CustomSectionText;
