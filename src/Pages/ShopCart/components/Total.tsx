import { Stack } from "@mui/material";
import CustomProductText from "../../../Components/utils/CustomProductText";
import { mainColor } from "../../../Components/utils/CustomStyles";
import { FC } from "react";

interface Props {
  color?: string;
}
export const Total = () => {
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
  return (
    <Stack gap={3}>
      <CustomProductText text="сумма заказа" fw={500} fz={25} />
      <Stack direction="row" justifyContent="space-between">
        <CustomProductText text="стоимость продуктов" fw={500} fz={16} />
        <DashedSpan />
        <CustomProductText text={`${1179} ₽`} fw={500} fz={16} />
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <CustomProductText color={mainColor} text="скидка" fw={500} fz={16} />
        <DashedSpan color={mainColor} />
        <CustomProductText
          color={mainColor}
          text={`${638} ₽`}
          fw={500}
          fz={16}
        />
      </Stack>
    </Stack>
  );
};
