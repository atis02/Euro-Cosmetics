import { images } from "../../Pages/Product/components/interfaces";
import { Stack } from "@mui/material";

type Props = {
  item: images;
};

export const ProductStatuses = ({ item }: Props) => {
    
  return (
    <Stack position="absolute" direction="row">
      {Number(item?.discountValue) > 0 && (
        <Stack
          color="#fff"
          alignItems="center"
          justifyContent="center"
          bgcolor="#FF1686"
          width={30}
          height={30}
          fontFamily="Graphic"
          fontSize={13}
        >
          {item.discountValue}%
        </Stack>
      )}
      {item.Status?.id == 1 && (
        <Stack>
          <img src="/images/new.png" style={{ width: 30, height: 30 }} alt="" />
        </Stack>
      )}
    </Stack>
  );
};
