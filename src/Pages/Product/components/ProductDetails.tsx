import { Stack } from "@mui/material";
import { FC } from "react";
import CustomProductText from "../../../Components/utils/CustomProductText";
import { Product } from "./interfaces";
import { CustomButton } from "../../../Components/utils/CustomButton";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { mainColor } from "../../../Components/utils/CustomStyles";

export const ProductDetails: FC<Product> = ({ product }) => {
  return (
    <Stack gap={3}>
      <Stack direction="row" alignItems="center" gap={3}>
        <CustomProductText
          border="1px solid #000"
          fz={15}
          width={50}
          ai="center"
          ta="center"
          height={50}
          mainText={product.stock}
          fw={500}
        />
        <CustomProductText fz={15} mainText="количество / шт" fw={500} />
      </Stack>
      <CustomProductText fz={40} fw={500} mainText={`${product.sellPrice} ₽`} />
      <Stack direction="row" gap={1}>
        <CustomButton
          text="Добавить в корзину"
          textColor={mainColor}
          width={300}
        />
        <CustomButton
          text={<FavoriteBorderOutlined sx={{ mt: 0.8 }} />}
          textColor={mainColor}
          width={50}
          height={50}
          showIcon={false}
        />
      </Stack>
    </Stack>
  );
};
