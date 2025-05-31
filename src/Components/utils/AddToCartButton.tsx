import { FC } from "react";
import { Product } from "../../Pages/Product/components/interfaces";
import { IconButton } from "@mui/material";
import { OpenNotification } from "./CustomToast";
import { addProduct } from "../redux/reducers/cartSlice";
import { useDispatch } from "react-redux";

export const AddToCartButton: FC<Product> = ({ product }) => {
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
      title: product.title,
    });
  };
  return (
    <IconButton onClick={handleToggle}>
      <svg viewBox="0 0 21 21" style={{ width: 20, height: 20 }} fill="#fff">
        <path
          fillRule="evenodd"
          stroke="none"
          d="M7 6v-.5a3.5 3.5 0 1 1 7 0V6h3v13H4V6h3Zm1-.5a2.5 2.5 0 0 1 5 0V6H8v-.5ZM7 7v1.5h1V7h5v1.5h1V7h2v11H5V7h2Z"
          clipRule="evenodd"
        ></path>
      </svg>
    </IconButton>
  );
};
