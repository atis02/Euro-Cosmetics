import { FC, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomProductTextConatiner from "../../../../Components/utils/CustomProductTextConatiner";
import { East } from "@mui/icons-material";
import { hoverStyle } from "../../../../Components/utils/CustomStyles";
import FavoriteButton from "../../../../Components/utils/FavoriteButtonComponent";
import { images } from "../../../../Components/utils/productsSwiper/constants";
import { useNavigate } from "react-router-dom";
import { AddToCartButton } from "../../../../Components/utils/AddToCartButton";
import { Rating } from "../../../Product/components/Rating";
import { testData } from "../../../Product/components/interfaces";

const MobileProducts: FC = () => {
  const [showCartButton, setShowCartButton] = useState<string | null>("");

  const navigate = useNavigate();
  const handleNavigate = (item: any) => {
    navigate(`/product/${item.barcode}`);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      {images.map((item, i) => {
        return (
          <Stack
            key={item.articule + "-" + i}
            sx={{
              width: 203,
              height: 450,
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => handleNavigate(item)}
            onMouseEnter={() => setShowCartButton(item.articule)}
            onMouseLeave={() => setShowCartButton(null)}
          >
            {item.image && (
              <Stack position="absolute" right={0} zIndex={100}>
                <FavoriteButton product={item as testData} />
              </Stack>
            )}
            {showCartButton === item.articule && item.image && (
              <Stack
                position="absolute"
                bottom={190}
                right={15}
                zIndex={100}
                bgcolor={"#000"}
                borderRadius="100%"
              >
                <AddToCartButton product={item as testData} />
              </Stack>
            )}
            {item.image !== "" ? (
              <img
                src={item.image}
                alt={`product-${i}`}
                style={{
                  width: "100%",
                  height: 240,
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
                }}
              >
                <CustomProductTextConatiner
                  textCategory={item.category}
                  mainText={item.title}
                  discountPrice={item.discountPrice}
                  sellPrice={item.sellPrice}
                  ta="left"
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
                  isCart={false}
                  textCategory={item.category}
                  mainText={item.title}
                  discountPrice={item.discountPrice}
                  sellPrice={item.sellPrice}
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
