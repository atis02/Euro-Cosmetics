import { Stack, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  text?: string | number;
  fw?: number;
  fz?: number;
  mainText?: string;
  discountPrice?: number;
  lineThrough?: boolean;
  discounted?: boolean;
  ta?:
    | "left"
    | "right"
    | "center"
    | "justify"
    | "inherit"
    | "initial"
    | "unset";
};

const CustomProductText: FC<Props> = ({
  fw = 400,
  fz = 15,
  text = "",
  mainText = "",
  discountPrice = 0,
  lineThrough = false,
  discounted = false,
  ta = "inherit",
}) => {
  return (
    <Stack>
      <Typography
        variant="caption"
        textAlign={ta}
        fontFamily="Graphic"
        fontWeight={fw}
        fontSize={fz}
        sx={{
          textDecoration: lineThrough ? "line-through" : "none",
          color: discounted ? "#b3b3b3" : "#000",
        }}
      >
        {text !== ""
          ? text
          : mainText !== ""
          ? mainText
          : discountPrice !== 0
          ? discountPrice
          : ""}
        {discountPrice !== 0 ? "$" : ""}
      </Typography>
    </Stack>
  );
};

export default CustomProductText;
