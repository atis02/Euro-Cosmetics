import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteBorderOutlined, Favorite } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Product } from "../../Pages/Product/components/interfaces";
import { toggleFavorite } from "../redux/reducers/favoriteSlice";
import { mainColor } from "./CustomStyles";
import React from "react";
import { GoldAppleNotification } from "./CustomToastFavorite";
import { toast } from "react-toastify";

const FavoriteButton: FC<Product> = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.items);

  const isFavorite: boolean = favorites.some(
    (item: Product) => item.product?.articule === product.articule
  );
  const openNotification = (image?: string) => {
    toast(
      <GoldAppleNotification image={image} message="добавлен в избранное!" />,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      }
    );
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    dispatch(toggleFavorite({ product }));
    !isFavorite ? openNotification(product.image) : "";
  };

  return (
    <IconButton onClick={handleToggle}>
      {isFavorite ? (
        <Favorite
          sx={{
            "&:hover": { color: mainColor },
            color: "#000",
          }}
        />
      ) : (
        <FavoriteBorderOutlined />
      )}
    </IconButton>
  );
};

export default FavoriteButton;
