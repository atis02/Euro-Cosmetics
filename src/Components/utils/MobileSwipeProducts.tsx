import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Stack, Typography } from "@mui/material";
import { FC, useRef } from "react";
import FavoriteButton from "./FavoriteButtonComponent";
import { AddToCartButton } from "./AddToCartButton";

interface Props {
  products: any;
  text: string;
  width?: string | number;
  p?: number;
  mt?: number;
  isMobile?: boolean;
}
export const MobileSwipeProducts: FC<Props> = ({
  products,
  text,
  width = "92vw",
  p,
  mt,
  isMobile,
}) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <Stack mt={mt}>
      <Typography
        mb={1}
        ml={2}
        fontSize={25}
        textAlign="start"
        fontFamily="Graphic"
        fontWeight={500}
        letterSpacing={2}
      >
        {text}
      </Typography>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={20}
        slidesPerView={isMobile ? 1.75 : 2.4}
        pagination={{ clickable: true }}
        style={{ width: width }}
      >
        {products.map((product: any, index: number) => (
          <SwiperSlide key={index}>
            <Stack
              sx={{
                minWidth: 140,
                minHeight: isMobile ? 300 : 305,
                display: "flex",
                position: "relative",
              }}
            >
              <Stack position="absolute" right={-4} top={-4} zIndex={100}>
                <FavoriteButton product={product} />
              </Stack>
              <Stack
                position="absolute"
                bottom={90}
                right={10}
                zIndex={100}
                bgcolor={"#464646"}
                borderRadius="100%"
              >
                <AddToCartButton product={product} />
              </Stack>
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: isMobile ? 225 : 140,
                  objectFit: "cover",
                  backgroundColor: "#fff",
                }}
              />
              <Stack p={p}>
                <Typography
                  mt={1}
                  fontSize={10}
                  textAlign="start"
                  fontFamily="Graphic"
                  fontWeight={500}
                  letterSpacing={2}
                >
                  {product.category}
                </Typography>
                <Typography fontSize={16} fontFamily="Graphic" fontWeight={500}>
                  {product.title}
                </Typography>
                <Stack direction="row" gap={1}>
                  <Typography
                    fontWeight={500}
                    fontFamily="Graphic"
                    fontSize={14}
                  >
                    {product.sellPrice} ₸
                  </Typography>
                  <Typography
                    fontSize={14}
                    color="gray"
                    fontWeight={500}
                    fontFamily="Graphic"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {product.sellPrice + product.discountPrice} ₸
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};
