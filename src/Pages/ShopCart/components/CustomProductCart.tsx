import { Box, Stack } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../Product/components/interfaces";
import FavoriteButton from "../../../Components/utils/FavoriteButtonComponent";
import CustomProductTextConatiner from "../../../Components/utils/CustomProductTextConatiner";

export const CustomProductCart: FC<Product> = ({ product }) => {
  const [showFavorite, setShowFavorite] = useState(false);
  const [showAddMinus, setShowAddMinus] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (item: any) => {
    navigate(`/product/${item.title}`);
    localStorage.setItem("productEuroCos", JSON.stringify(item));
  };

  return (
    <Box
      key={`bg-${product.articule}`}
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
        <img
          src={product.image}
          alt={`background-${product.title}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            cursor: "pointer",
          }}
          onMouseEnter={() => setShowFavorite(true)}
          onMouseLeave={() => setShowFavorite(false)}
        />
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
          mainText={product.title}
          discountPrice={product.discountPrice || 0}
          sellPrice={product.sellPrice || 0}
          jc="flex-end"
          showAddMinus={showAddMinus}
          article={product.articule}
        />
      </Stack>
    </Box>
  );
};
