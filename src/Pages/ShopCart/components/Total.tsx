import { Stack } from "@mui/material";
import CustomProductText from "../../../Components/utils/CustomProductText";
import { mainColor } from "../../../Components/utils/CustomStyles";
import { FC } from "react";
import { useSelector } from "react-redux";
import { CartItem } from "../../../Components/utils/interfaces";
import CountUp from "react-countup";

interface Props {
  color?: string;
}

export const Total = () => {
  const cartItems = useSelector((state: any) => state.cart.items);

  const DashedSpan: FC<Props> = ({ color = "#000" }) => {
    return (
      <span
        style={{
          flex: 1,
          borderBottom: `1px dashed ${color}`,
          margin: "0 8px",
        }}
      ></span>
    );
  };

  const totalSum = cartItems.reduce(
    (sum: number, item: CartItem) =>
      sum + item.product?.sellPrice * item.quantity,

    0
  );
  const totalDiscount = cartItems.reduce(
    (discount: number, item: CartItem) =>
      discount + item.product?.discountPrice * item.quantity,
    0
  );

  return (
    <Stack gap={3}>
      <CustomProductText text="сумма заказа" fw={500} fz={25} />
      <Stack direction="row" justifyContent="space-between">
        <CustomProductText text="стоимость продуктов" fw={500} fz={16} />
        <DashedSpan />
        <CountUp
          end={totalSum}
          duration={0.6}
          separator=" "
          prefix="скидка $ "
          style={{
            color: mainColor,
            fontWeight: 500,
            fontFamily: "Graphic",
          }}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <CustomProductText color={mainColor} text="скидка" fw={500} fz={16} />
        <DashedSpan color={mainColor} />
        <CountUp
          end={totalDiscount}
          duration={0.6}
          separator=" "
          prefix="–  "
          suffix=" ₽"
          style={{
            color: mainColor,
            fontWeight: 500,
            fontFamily: "Graphic",
          }}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        gap={3}
        justifyContent="flex-end"
      >
        <CustomProductText text="итого" fw={500} fz={20} />
        <CountUp
          end={totalSum - totalDiscount}
          duration={0.6}
          separator=" "
          suffix=" ₽"
          style={{
            fontWeight: 500,
            fontFamily: "Graphic",
            fontSize: 28,
          }}
        />
      </Stack>
    </Stack>
  );
};
