import { FC } from "react";
import { Product } from "./interfaces";
import { ProductImagesSwiper } from "./ProductImagesSwiper";

export const ProductImagesComponent: FC<Product> = ({ product }) => {
  return <ProductImagesSwiper product={product} />;
};
