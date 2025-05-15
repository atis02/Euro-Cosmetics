import { Stack } from "@mui/material";
import { FC } from "react";
import CustomProductText from "./CustomProductText";
import { hoverStyle } from "./CustomStyles";

type Props = {
  textCategory: string;
  mainText: string;
  discountPrice: number;
  sellPrice: number;
  ta?:
    | "left"
    | "right"
    | "center"
    | "justify"
    | "inherit"
    | "initial"
    | "unset";
  fz?: number;
  jc?: "flex-end" | "center" | "start";
};

const CustomProductTextConatiner: FC<Props> = ({
  textCategory,
  mainText,
  discountPrice,
  sellPrice,
  ta,
  fz = 20,
  jc = "flex-end",
}) => {
  return (
    <Stack sx={hoverStyle}>
      <CustomProductText text={textCategory} />
      <CustomProductText fz={fz} fw={500} mainText={mainText} ta={ta} />
      <Stack direction="row" gap={2} justifyContent={jc}>
        <CustomProductText fz={fz} fw={500} discountPrice={sellPrice} />
        <CustomProductText
          fz={fz}
          fw={500}
          lineThrough
          discounted
          discountPrice={sellPrice + discountPrice}
        />
      </Stack>
    </Stack>
  );
};

export default CustomProductTextConatiner;
