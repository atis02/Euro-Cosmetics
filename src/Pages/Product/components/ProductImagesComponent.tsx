import { Stack } from "@mui/material";
import { FC } from "react";

interface images {
  image?: string;
  productStatus?: string;
  title: string;
  sellPrice?: number;
  discountPrice?: number;
  category?: string;
}
interface Product {
  product: images;
}

export const ProductImagesComponent: FC<Product> = ({ product }) => {
  return (
    <Stack>
      <img src={product?.image} alt="" />
    </Stack>
  );
};
