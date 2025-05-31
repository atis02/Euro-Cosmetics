import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteBorderOutlined, Favorite } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Product } from "../../Pages/Product/components/interfaces";
import { toggleFavorite } from "../redux/reducers/favoriteSlice";
import { mainColor } from "./CustomStyles";
import React from "react";
import { OpenNotification } from "./CustomToast";

const FavoriteButton: FC<Product> = ({
  width,
  height,
  bgcolor = "transparent",
  product,
  color = "#000",
  br = "100%",
}) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.items);

  const isFavorite: boolean = favorites.some(
    (item: Product) => item.product?.articule === product.articule
  );

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    dispatch(toggleFavorite({ product }));
    !isFavorite
      ? OpenNotification({
          image: product.imageOne,
          text: "добавлен в избранное!",
          icon: <FavoriteBorderOutlined />,
          title: product.title,
        })
      : "";
  };

  return (
    <IconButton
      onClick={handleToggle}
      sx={{
        width: width,
        height: height,
        bgcolor: bgcolor,
        borderRadius: br,
      }}
    >
      {isFavorite ? (
        <Favorite
          sx={{
            "&:hover": { color: mainColor },
            color: color,
          }}
        />
      ) : (
        <FavoriteBorderOutlined sx={{ color: color }} />
      )}
    </IconButton>
  );
};

export default FavoriteButton;
