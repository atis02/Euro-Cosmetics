import { FC, useState } from "react";
import { CustomContainerAll } from "../../../../Components/utils/CustomContainerAll";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import CustomProductTextConatiner from "../../../../Components/utils/CustomProductTextConatiner";
import { East } from "@mui/icons-material";
import { hoverStyle } from "../../../../Components/utils/CustomStyles";
import FavoriteButton from "../../../../Components/utils/FavoriteButtonComponent";
import { useNavigate } from "react-router-dom";
import { AddToCartButton } from "../../../../Components/utils/AddToCartButton";
import { Rating } from "../../../Product/components/Rating";
import { images } from "../../../Product/components/interfaces";
import { BASE_URL } from "../../../../Fetcher/swrConfig";
import { ProductStatuses } from "../../../../Components/utils/ProductsStatuses";

interface Props {
  product: images[];
  close?: () => void;
  color?: boolean;
}

const Products: FC<Props> = ({ close, product, color }) => {
  const [showCartButton, setShowCartButton] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNavigate = (item: any) => {
    close?.();
    navigate(`/product/${item.barcode}`);
  };

  return (
    <CustomContainerAll mt={2}>
      <Grid container spacing={4} justifyContent="flex-start">
        {product?.map((item, i) => {
          const imageSrc = 
            item?.imageOne
            ? `${BASE_URL}/${item?.imageOne}`
            : "";

          const hasImage = !!imageSrc;

          return (
            <Grid
              key={`${item?.barcode}-${i}`}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <Stack
                sx={{
                  height: 400,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => handleNavigate(item)}
                onMouseEnter={() => setShowCartButton(item?.id)}
                onMouseLeave={() => setShowCartButton(null)}
              >
                <ProductStatuses item={item} />

                {hasImage && (
                  <Stack position="absolute" right={0} zIndex={100}>
                    <FavoriteButton product={item as any}/>
                  </Stack>
                )}

                {showCartButton === item?.id && hasImage && (
                  <Stack
                    position="absolute"
                    bottom={130}
                    right={15}
                    zIndex={100}
                    bgcolor="#000"
                    borderRadius="100%"
                  >
                    <AddToCartButton product={item} />
                  </Stack>
                )}

                {hasImage ? (
                  <img
                    src={imageSrc}
                    alt={`product-${i}`}
                    crossOrigin="anonymous"
                    style={{
                      width: "100%",
                      height: 280,
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: 280,
                      display: "flex",
                      alignItems: "start",
                      flexDirection: "column",
                      justifyContent: "center",
                      backgroundColor: "#fff",
                      ...hoverStyle,
                      gap: 2,
                      p: 2,
                    }}
                  >
                    <CustomProductTextConatiner
                      textCategory={item?.category}
                      mainText={item.nameRu || "Нет названия"}
                      discountPrice={Number(item.discountValue) || 0}
                      sellPrice={Number(item.currentSellPrice) || 0}
                      discounted={Number(item.sellPrice) || 0}
                      decimals={2}
                    />
                    <Button sx={{ gap: 2, p: 0 }}>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          fontFamily: "Graphic",
                          color: "#000",
                        }}
                      >
                        Смотреть всё
                      </Typography>
                      <East sx={{ color: "#000", width: 15, height: 15 }} />
                    </Button>
                  </Box>
                )}

                {hasImage && (
                  <Stack
                    sx={{
                      p: 1,
                      textAlign: "right",
                      flexDirection: "column",
                      alignItems: "end",
                    }}
                  >
                    <Rating showtext={false} gap={1} product={item} />
                    <CustomProductTextConatiner
                      textCategory={item?.category}
                      mainText={
                        item.headerRu || item.nameRu || "Нет названия"
                      }
                      discountPrice={Number(item.discountValue) || 0}
                      sellPrice={Number(item.currentSellPrice) || 0}
                      discounted={Number(item.sellPrice) || 0}
                      decimals={2}
                      color={color}
                    />
                  </Stack>
                )}
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </CustomContainerAll>
  );
};

export default Products;
