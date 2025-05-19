import { FC } from "react";
import { Rate } from "antd";
import { images } from "./interfaces";
import { Stack } from "@mui/material";
import CustomProductText from "../../../Components/utils/CustomProductText";

interface Props {
  product: images;
  gap?: string | number;
  showtext?: boolean;
}
export const Rating: FC<Props> = ({ product, gap = 0, showtext = true }) => {
  return (
    <Stack direction="row" alignItems="center" gap={gap}>
      <Rate allowHalf defaultValue={5} />
      <CustomProductText
        fw={500}
        mainText={`${product.feedBackNumb} ${showtext ? "отзывов" : ""}`}
      />
    </Stack>
  );
};
