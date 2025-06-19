import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { Product } from "../../Pages/Product/components/interfaces";
import CustomProductTextConatiner from "./CustomProductTextConatiner";
import FavoriteButton from "./FavoriteButtonComponent";
import { useNavigate } from "react-router-dom";
import { Rate } from "antd";
import CustomProductText from "./CustomProductText";
import { CustomImageComponent } from "./CustomImageComponent";
import { ProductStatuses } from "./ProductsStatuses";

export const CustomProductCart: FC<Product> = ({ product }) => {
  const navigate = useNavigate();
  const handleNavigate = (item: any) => {
    navigate(`/product/${item.barcode}`);
    localStorage.setItem("productEuroCos", JSON.stringify(item));
  };
  return (
    <Box
      key={`bg-${product.id}`}
      sx={{
        width: 182,
        height: 182,
        position: "relative",
      }}
      onClick={() => handleNavigate(product)}
    >
      <ProductStatuses item={product} />
      <Stack position="absolute" right={0} zIndex={100}>
        <FavoriteButton product={product as any} />
      </Stack>
      <CustomImageComponent product={product} notIsMobileHeight="100%" />
      <Stack sx={{ p: 1, textAlign: "left", flexDirection: "column" }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <CustomProductText fw={500} mainText={product.feedBackNumb} />
          <Rate allowHalf defaultValue={5} />
        </Stack>
        <CustomProductTextConatiner
          fz={16}
          textCategory={product.category || ""}
          mainText={product.title}
          discountPrice={product.discountPrice || 0}
          sellPrice={Number(product.currentSellPrice) || 0}
          jc="start"
        />
      </Stack>
    </Box>
  );
};
