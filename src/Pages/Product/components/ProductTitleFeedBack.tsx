import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import CustomProductText from "../../../Components/utils/CustomProductText";
import { Rating } from "./Rating";
import { Product } from "./interfaces";

export const ProductTitleFeedBack: FC<Product> = ({ product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Stack mb={isMobile ? 0 : -5} gap={2} zIndex={10}>
      {isMobile ? "" : <Rating product={product} />}
      <CustomProductText fz={14} fw={500} mainText={product.category} />
      <CustomProductText
        fz={isMobile ? 30 : 45}
        fw={500}
        mainText={product.title}
      />
    </Stack>
  );
};
