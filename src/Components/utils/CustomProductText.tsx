import { Stack, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  text?: string | number;
  fw?: number;
  fz?: number;
  mainText?: string | number;
  discountPrice?: number | string;
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
  border?: "1px solid #000";
  width?: number | string;
  height?: number | string;
  ai?: "center" | "start" | "end";
  sai?: "center" | "start" | "end";
  color?: string;
  lineHeight?: number | string;
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
  ai,
  border = "",
  width,
  height,
  sai,
  color = "#000",
  lineHeight = 1,
}) => {
  return (
    <Stack alignItems={sai}>
      <Typography
        variant="caption"
        textAlign={ta}
        fontFamily="Graphic"
        fontWeight={fw}
        fontSize={fz}
        width={width}
        height={height}
        alignContent={ai}
        lineHeight={lineHeight}
        sx={{
          border: border,
          textDecoration: lineThrough ? "line-through" : "none",
          color: discounted ? "#b3b3b3" : color,
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
