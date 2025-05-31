import { Box, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../Product/components/interfaces";
import FavoriteButton from "../../../Components/utils/FavoriteButtonComponent";
import CustomProductTextConatiner from "../../../Components/utils/CustomProductTextConatiner";
import { useSelector } from "react-redux";
import { CustomImageComponent } from "../../../Components/utils/CustomImageComponent";

export const CustomProductCart: FC<Product> = ({ product }) => {
  const [showFavorite, setShowFavorite] = useState(false);
  const [showAddMinus, setShowAddMinus] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (item: any) => {
    navigate(`/product/${item.barcode}`);
  };
  const cartItems = useSelector((state: any) => state.cart.items);

  const filtered = cartItems.filter(
    (item: Product) => item.product?.id == product.id
  );

  return (
    <Box
      key={`bg-${product.id}`}
      sx={{
        position: "relative",
        display: "flex",
      }}
      onClick={() => handleNavigate(product)}
      onMouseEnter={() => setShowAddMinus(true)}
      onMouseLeave={() => setShowAddMinus(false)}
    >
      <Stack width={130} height={100} position="relative">
        {showFavorite ? (
          <Stack
            position="absolute"
            right={33}
            top={33}
            bgcolor="#000"
            zIndex={100}
            borderRadius="100%"
            onMouseEnter={() => setShowFavorite(true)}
          >
            <FavoriteButton color="#fff" product={product} />
          </Stack>
        ) : (
          ""
        )}
        <CustomImageComponent
          product={product}
          notIsMobileHeight="100%"
          setShowFavorite={setShowFavorite}
        />

        {filtered[0]?.quantity > 1 && (
          <Typography
            position="absolute"
            fontWeight={500}
            fontFamily="Graphic"
            bottom={0}
            right={10}
          >
            x{filtered[0]?.quantity}
          </Typography>
        )}
      </Stack>
      <Stack
        sx={{
          p: 1,
          width: "100%",
          height: 100,
          textAlign: "left",
        }}
      >
        <CustomProductTextConatiner
          fz={16}
          isCart
          textCategory={product.category || ""}
          mainText={product.nameRu}
          discountPrice={Number(product.discountValue) || 0}
          sellPrice={Number(product.currentSellPrice) || 0}
          discounted={Number(product.sellPrice) || 0}
          jc="flex-end"
          justifyContCart
          showAddMinus={showAddMinus}
          id={product.id}
          quantity={filtered[0]?.quantity}
        />
      </Stack>
    </Box>
  );
};
