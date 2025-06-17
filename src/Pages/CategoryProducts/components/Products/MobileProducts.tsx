import { FC } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomProductTextConatiner from "../../../../Components/utils/CustomProductTextConatiner";
import { East } from "@mui/icons-material";
import { hoverStyle } from "../../../../Components/utils/CustomStyles";
import FavoriteButton from "../../../../Components/utils/FavoriteButtonComponent";
// import { images } from "../../../../Components/utils/productsSwiper/constants";
import { useNavigate } from "react-router-dom";
import { AddToCartButton } from "../../../../Components/utils/AddToCartButton";
import { Rating } from "../../../Product/components/Rating";
import { images, testData } from "../../../Product/components/interfaces";
import { BASE_URL } from "../../../../Fetcher/swrConfig";
import { ProductStatuses } from "../../../../Components/utils/ProductsStatuses";

interface Props {
  product: images[];
  close?: () => void;
}
const MobileProducts: FC<Props> = ({ product, close }) => {
  const navigate = useNavigate();
  const handleNavigate = (item: any) => {
    close && close();
    navigate(`/product/${item.barcode}`);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      {product?.length &&
        product.map((item, i) => {
          return (
            <Stack
              key={item.articule + "-" + i}
              sx={{
                width: 203,
                height: 350,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                cursor: "pointer",
                position: "relative",
                mb: 1,
              }}
              onClick={() => handleNavigate(item)}
            >
                    <ProductStatuses item={item} />
              
              {item.imageOne && (
                <Stack position="absolute" right={0} zIndex={100}>
                  <FavoriteButton product={item as testData} />
                </Stack>
              )}
              {item.imageOne && (
                <Stack
                  position="absolute"
                  bottom={100}
                  right={10}
                  zIndex={100}
                  bgcolor={"#000"}
                  borderRadius="100%"
                >
                  <AddToCartButton product={item as testData} />
                </Stack>
              )}
              {item.imageOne !== "" ? (
                <img
                  src={`${BASE_URL}/${item?.imageOne}`}
                  alt={`product-${i}`}
                  style={{
                    width: "100%",
                    height: 240,
                    objectFit: "cover",
                  }}
                  crossOrigin="anonymous"
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
                  <Button
                    sx={{
                      gap: 2,
                      p: 0,
                    }}
                  >
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
                    <East
                      sx={{
                        color: "#000",
                        width: 15,
                        height: 15,
                      }}
                    />
                  </Button>
                </Box>
              )}
              {item.image !== "" ? (
                <Stack
                  sx={{
                    p: 1,
                    textAlign: "right",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  <Rating showtext={false} gap={1} product={item as testData} />
                  <CustomProductTextConatiner
                    textCategory={item?.category}
                    mainText={item.nameRu || "Нет названия"}
                    discountPrice={Number(item.discountValue) || 0}
                    sellPrice={Number(item.currentSellPrice) || 0}
                    discounted={Number(item.sellPrice) || 0}
                    decimals={2}
                    fz={16}
                  />
                </Stack>
              ) : (
                ""
              )}
            </Stack>
          );
        })}
    </Stack>
  );
};

export default MobileProducts;
