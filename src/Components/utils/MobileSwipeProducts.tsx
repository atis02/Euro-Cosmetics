// import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
// import { Stack, Typography } from "@mui/material";
// import { FC, useRef } from "react";
// import FavoriteButton from "./FavoriteButtonComponent";
// import { AddToCartButton } from "./AddToCartButton";
// import { CustomImageComponent } from "./CustomImageComponent";
// import { useNavigate, useParams } from "react-router-dom";
// import { imagesProps } from "./interfaces";

// interface Props {
//   products: any;
//   text: string;
//   width?: string | number;
//   p?: number;
//   mt?: number;
//   isMobile?: boolean;
//   isLoading?: boolean;
//   isProductDetail?: boolean;
//   isCart?: boolean;
// }
// export const MobileSwipeProducts: FC<Props> = ({
//   products,
//   text,
//   width = "92vw",
//   p,
//   mt,
//   isMobile,
//   isLoading,
//   isProductDetail,
//   isCart,
// }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const swiperRef = useRef<SwiperClass | null>(null);
//   if (isLoading) return <p>Loading...</p>;
//   const filtered =
//     products.products?.length &&
//     products?.products.filter((e: any) => e.barcode !== id);
//   const handleNavigate = (item: imagesProps) => {
//     navigate(`/product/${item.barcode}`);
//   };
//   return (
//     <Stack mt={mt}>
//       <Typography
//         mb={1}
//         ml={2}
//         fontSize={25}
//         textAlign="start"
//         fontFamily="Graphic"
//         fontWeight={500}
//         letterSpacing={2}
//       >
//         {text}
//       </Typography>
//       <Swiper
//         onSwiper={(swiper) => (swiperRef.current = swiper)}
//         spaceBetween={20}
//         slidesPerView={isMobile ? 1.75 : 2.4}
//         pagination={{ clickable: true }}
//         style={{ width: width }}
//       >
//         {isProductDetail
//           ? filtered.map((product: any, index: number) => (
//               <SwiperSlide key={index} onClick={() => handleNavigate(product)}>
//                 <Stack
//                   sx={{
//                     minWidth: 140,
//                     minHeight: isMobile ? 300 : 305,
//                     display: "flex",
//                     position: "relative",
//                   }}
//                 >
//                   <Stack position="absolute" right={-4} top={-4} zIndex={100}>
//                     <FavoriteButton product={product} />
//                   </Stack>
//                   <Stack
//                     position="absolute"
//                     bottom={90}
//                     right={10}
//                     zIndex={100}
//                     bgcolor={"#464646"}
//                     borderRadius="100%"
//                   >
//                     <AddToCartButton product={product} />
//                   </Stack>

//                   <CustomImageComponent product={product} isMobile={isMobile} />
//                   <Stack p={p}>
//                     <Typography
//                       mt={1}
//                       fontSize={10}
//                       textAlign="start"
//                       fontFamily="Graphic"
//                       fontWeight={500}
//                       letterSpacing={2}
//                     >
//                       {product.Category?.nameRu}
//                     </Typography>
//                     <Typography
//                       fontSize={16}
//                       fontFamily="Graphic"
//                       fontWeight={500}
//                     >
//                       {product.nameRu}
//                     </Typography>
//                     <Stack direction="row" gap={1}>
//                       <Typography
//                         fontWeight={500}
//                         fontFamily="Graphic"
//                         fontSize={14}
//                       >
//                         {product.currentSellPrice} TMT
//                       </Typography>
//                       {product.discountValue > 0 && (
//                         <Typography
//                           fontSize={14}
//                           color="gray"
//                           fontWeight={500}
//                           fontFamily="Graphic"
//                           sx={{ textDecoration: "line-through" }}
//                         >
//                           {product.sellPrice} TMT
//                         </Typography>
//                       )}
//                     </Stack>
//                   </Stack>
//                 </Stack>
//               </SwiperSlide>
//             ))
//           : products.products?.length &&
//             products?.products.map((product: any, index: number) => (
//               <SwiperSlide key={index} onClick={() => handleNavigate(product)}>
//                 <Stack
//                   sx={{
//                     minWidth: 140,
//                     minHeight: isMobile ? 300 : 305,
//                     display: "flex",
//                     position: "relative",
//                   }}
//                 >
//                   <Stack position="absolute" right={-4} top={-4} zIndex={100}>
//                     <FavoriteButton product={product} />
//                   </Stack>
//                   <Stack
//                     position="absolute"
//                     bottom={isCart ? 160 : 90}
//                     right={10}
//                     zIndex={100}
//                     bgcolor={"#464646"}
//                     borderRadius="100%"
//                   >
//                     <AddToCartButton product={product} />
//                   </Stack>

//                   <CustomImageComponent product={product} isMobile={isMobile} />
//                   <Stack p={p}>
//                     <Typography
//                       mt={1}
//                       fontSize={10}
//                       textAlign="start"
//                       fontFamily="Graphic"
//                       fontWeight={500}
//                       letterSpacing={2}
//                     >
//                       {product.Category?.nameRu}
//                     </Typography>
//                     <Typography
//                       fontSize={16}
//                       fontFamily="Graphic"
//                       fontWeight={500}
//                     >
//                       {product.nameRu}
//                     </Typography>
//                     <Stack direction="row" gap={1}>
//                       <Typography
//                         fontWeight={500}
//                         fontFamily="Graphic"
//                         fontSize={14}
//                       >
//                         {product.currentSellPrice} TMT
//                       </Typography>
//                       {product.discountValue > 0 && (
//                         <Typography
//                           fontSize={14}
//                           color="gray"
//                           fontWeight={500}
//                           fontFamily="Graphic"
//                           sx={{ textDecoration: "line-through" }}
//                         >
//                           {product.sellPrice} TMT
//                         </Typography>
//                       )}
//                     </Stack>
//                   </Stack>
//                 </Stack>
//               </SwiperSlide>
//             ))}
//       </Swiper>
//     </Stack>
//   );
// };
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Stack, Typography } from "@mui/material";
import { FC, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteButton from "./FavoriteButtonComponent";
import { AddToCartButton } from "./AddToCartButton";
import { CustomImageComponent } from "./CustomImageComponent";
import { imagesProps } from "./interfaces";

interface Props {
  products: any;
  text: string;
  width?: string | number;
  p?: number;
  mt?: number;
  isMobile?: boolean;
  isLoading?: boolean;
  isProductDetail?: boolean;
  isCart?: boolean;
}

export const MobileSwipeProducts: FC<Props> = ({
  products,
  text,
  width = "93vw",
  p,
  mt,
  isMobile,
  isLoading,
  isProductDetail,
  isCart,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperClass | null>(null);

  if (isLoading) return <p>Loading...</p>;

  const productList = isProductDetail
    ? products?.products?.filter((e: any) => e.barcode !== id)
    : products?.products || [];

  const handleNavigate = (item: imagesProps) => {
    navigate(`/product/${item.barcode}`);
  };

  const renderSlideContent = (product: any) => (
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
        bottom={isCart ? 160 : 90}
        right={10}
        zIndex={100}
        bgcolor={"#464646"}
        borderRadius="100%"
      >
        <AddToCartButton product={product} />
      </Stack>
      <CustomImageComponent product={product} isMobile={isMobile} />
      <Stack p={p}>
        <Typography
          mt={1}
          fontSize={10}
          textAlign="start"
          fontFamily="Graphic"
          fontWeight={500}
          letterSpacing={2}
        >
          {product.Category?.nameRu}
        </Typography>
        <Typography fontSize={16} fontFamily="Graphic" fontWeight={500}>
          {product.nameRu}
        </Typography>
        <Stack direction="row" gap={1}>
          <Typography fontWeight={500} fontFamily="Graphic" fontSize={14}>
            {product.currentSellPrice} TMT
          </Typography>
          {product.discountValue > 0 && (
            <Typography
              fontSize={14}
              color="gray"
              fontWeight={500}
              fontFamily="Graphic"
              sx={{ textDecoration: "line-through" }}
            >
              {product.sellPrice} TMT
            </Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  );

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
        style={{ width }}
      >
        {productList.map((product: any, index: number) => (
          <SwiperSlide key={index} onClick={() => handleNavigate(product)}>
            {renderSlideContent(product)}
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};
