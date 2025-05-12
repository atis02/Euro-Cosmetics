import { Stack } from "@mui/material";
import { FC } from "react";
import CustomProductText from "../../../Components/utils/CustomProductText";
import { Rating } from "./Rating";
import { Product } from "./interfaces";

export const ProductTitleFeedBack: FC<Product> = ({ product }) => {
  return (
    <Stack mb={-5} zIndex={10}>
      <Rating />
      <CustomProductText fz={14} fw={500} mainText={product.category} />
      <CustomProductText fz={45} fw={500} mainText={product.title} />
    </Stack>
  );
};
