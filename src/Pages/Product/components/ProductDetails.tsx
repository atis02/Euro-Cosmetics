import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import CustomProductText from "../../../Components/utils/CustomProductText";
import { Product } from "./interfaces";
import { CustomButton } from "../../../Components/utils/CustomButton";
import { mainColor } from "../../../Components/utils/CustomStyles";
import CountUp from "react-countup";
import { addProduct } from "../../../Components/redux/reducers/cartSlice";
import { OpenNotification } from "../../../Components/utils/CustomToast";
import { useDispatch } from "react-redux";
import FavoriteButton from "../../../Components/utils/FavoriteButtonComponent";

export const ProductDetails: FC<Product> = ({ product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    dispatch(addProduct({ product }));
    OpenNotification({
      image: product.imageOne,
      text: "добавлен в корзину!",
      icon: (
        <svg viewBox="0 0 21 21" style={{ width: 20, height: 20 }} fill="#fff">
          <path
            fillRule="evenodd"
            stroke="none"
            d="M7 6v-.5a3.5 3.5 0 1 1 7 0V6h3v13H4V6h3Zm1-.5a2.5 2.5 0 0 1 5 0V6H8v-.5ZM7 7v1.5h1V7h5v1.5h1V7h2v11H5V7h2Z"
            clip-rule="evenodd"
          ></path>
        </svg>
      ),
      title: product.nameRu,
    });
  };
  return (
    <Stack gap={3} width={isMobile ? "90vw" : "100%"}>
      {!isMobile && (
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
      )}
      <Stack mb={2} direction="row" gap={2}>
        <CountUp
          end={Number(product.currentSellPrice) ?? 0}
          decimals={2}
          duration={0.6}
          separator=" "
          suffix=" TMT "
          style={{
            fontSize: isMobile ? 30 : 40,
            fontWeight: 500,
            fontFamily: "Graphic",
          }}
        />
        {Number(product.discountValue) !== 0 && (
          <CountUp
            end={Number(product.sellPrice) ?? 0}
            duration={0.6}
            decimals={2}
            separator=" "
            suffix="TMT "
            style={{
              color: "#b3b3b3",
              fontSize: isMobile ? 30 : 40,
              fontWeight: 500,
              fontFamily: "Graphic",
              textDecoration: "line-through",
            }}
          />
        )}
      </Stack>
      {!isMobile && (
        <Stack direction="row" gap={1}>
          <CustomButton
            text="Добавить в корзину"
            textColor={mainColor}
            width={300}
            func={handleToggle}
          />
          <FavoriteButton
            bgcolor="#000"
            height={50}
            width={50}
            product={product}
            br={0}
            color={mainColor}
          />
        </Stack>
      )}
    </Stack>
  );
};
