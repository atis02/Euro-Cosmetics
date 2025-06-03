import { IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../Pages/Product/components/interfaces";
import { Remove, Add, Close } from "@mui/icons-material";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} from "../redux/reducers/cartSlice";
import { mainColor } from "./CustomStyles";
interface Props {
  id: string | undefined;
  showDeleteIcon?: boolean;
}
export const AddMinusBtns: FC<Props> = ({ id, showDeleteIcon }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  const filteredItems = cartItems.filter(
    (item: Product) => item.product.id == id
  );
  const handleMinus = (
    e: React.MouseEvent<HTMLButtonElement>,
    article: string
  ): void => {
    e.stopPropagation();

    dispatch(decreaseQuantity(article));
  };
  const handleAdd = (
    e: React.MouseEvent<HTMLButtonElement>,
    article: string
  ): void => {
    e.stopPropagation();
    dispatch(increaseQuantity(article));
  };
  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    article: string
  ): void => {
    e.stopPropagation();
    dispatch(removeProduct(article));
  };

  const styles = {
    color: "#000",
    "&:hover": { bgcolor: mainColor, color: "#fff" },
  };
  return (
    <Stack gap={1} direction="row" alignItems="center">
      <IconButton
        onClick={(e) => handleMinus(e, id ?? "")}
        disabled={filteredItems[0]?.stock == 1}
        sx={styles}
      >
        <Remove />
      </IconButton>
      <Typography
        textAlign="center"
        fontFamily="Graphic"
        fontSize={20}
        minWidth={20}
      >
        {filteredItems[0]?.quantity}
      </Typography>
      <IconButton sx={styles} onClick={(e) => handleAdd(e, id ?? "")}>
        <Add />
      </IconButton>
      {showDeleteIcon ? (
        ""
      ) : (
        <IconButton
          sx={{ styles, width: 10, height: 10 }}
          onClick={(e) => handleDelete(e, id ?? "")}
        >
          <Close
            sx={{
              width: 18,
              height: 18,
              color: "#000",
            }}
          />
        </IconButton>
      )}
    </Stack>
  );
};
