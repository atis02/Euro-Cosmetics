import { Stack } from "@mui/material";
import { Breadcrumb } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Product } from "./interfaces";

export const ProductBreadCrumbs: FC<Product> = ({ product }) => (
  <Stack width={{ lg: "50%" }}>
    <Breadcrumb
      items={[
        {
          title: <Link to="/">главная</Link>,
        },

        {
          title: product.category,
        },
      ]}
    />
  </Stack>
);
