import { FC } from "react";
import { Rate } from "antd";
import { Product } from "./interfaces";
import { Stack } from "@mui/material";
import CustomProductText from "../../../Components/utils/CustomProductText";

export const Rating: FC<Product> = ({ product }) => {
  return (
    <Stack direction="row">
      <Rate allowHalf defaultValue={5} />
      <CustomProductText
        fw={500}
        mainText={`${product.feedBackNumb} отзывов`}
      />
    </Stack>
  );
};
