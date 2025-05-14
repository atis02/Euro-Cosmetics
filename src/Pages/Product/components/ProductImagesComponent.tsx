import { Stack } from "@mui/material";
import { FC } from "react";
import { Product } from "./interfaces";
import { ProductImagesSwiper } from "./ProductImagesSwiper";

export const ProductImagesComponent: FC<Product> = ({ product }) => {
  return (
    <Stack>
      <ProductImagesSwiper product={product} />
    </Stack>
  );
};
