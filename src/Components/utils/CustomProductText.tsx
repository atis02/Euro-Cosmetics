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
};

const CustomProductText: FC<Props> = ({
  fw = 400,
  fz = 15,
  text = "",
  mainText = "",
  discountPrice = "",
  lineThrough = false,
  discounted = false,
}) => {
  return (
    <Stack>
      <Typography
        variant="caption"
        fontFamily="Graphic"
        fontWeight={fw}
        fontSize={fz}
        sx={{
          textDecoration: lineThrough ? "line-through" : "none",
          color: discounted ? "#b3b3b3" : "#000",
        }}
      >
        {text !== "" ? text : mainText !== "" ? mainText : discountPrice}
        {discountPrice !== "" ? "$" : ""}
      </Typography>
    </Stack>
  );
};

export default CustomProductText;
