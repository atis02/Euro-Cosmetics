import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { East } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { images, Product } from "../../Pages/Product/components/interfaces";
import { itemVariants } from "./productsSwiper/constants";
import { imagesProps } from "./interfaces";
import CustomSectionText from "./CustomSectionText";
import Buttons from "./productsSwiper/Buttons";
import { CustomImageComponent } from "./CustomImageComponent";
import CustomProductTextConatiner from "./CustomProductTextConatiner";
import FavoriteButton from "./FavoriteButtonComponent";
import { AddToCartButton } from "./AddToCartButton";
import { hoverStyle } from "./CustomStyles";

interface Props {
  isLoading?: boolean;
  error?: boolean | undefined | unknown;
  data?: Product;
  text: string;
  visibleCount?: number;
}

export const PopularProductsMini: FC<Props> = ({
  isLoading,
  error,
  data,
  text,
  visibleCount,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [prevImages, setPrevImages] = useState<images[]>([]);
  const [showCartButton, setShowCartButton] = useState<string | null>("");

  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  const products = Array.isArray(data?.products) ? data.products : [];
  const extendedImages = [...products];

  
  if (
    visibleCount &&
    products.length > 5 &&
    products.length % visibleCount !== 0
  ) {
    extendedImages.push({
      image: "",
      stock: 1,
      feedBackNumb: 1,
      articule: "",
      desc: "",
      productStatus:
        (products[0]?.Status && String(products[0]?.Status.id)) || "",
      sellPrice: 0,
      discountPrice: 0,
      category: "",
      title: "Ваша персональная подборка новинок",
      additionalInfoRu: "",
      additionalInfoTm: "",
      barcode: "",
      brandId: "",
      categoryId: "",
      compositionRu: "",
      compositionTm: "",
      currentSellPrice: "",
      descriptionRu: "",
      descriptionTm: "",
      discountType: "",
      discountValue: "",
      hashtags: [],
      id: "",
      imageFive: "",
      imageFour: "",
      imageOne: "",
      imageThree: "",
      imageTwo: "",
      incomePrice: "",
      isActive: false,
      isDisabled: false,
      limit: "",
      nameRu: "",
      nameTm: "",
      order: 0,
      productStatusId: 0,
      segmentId: "",
      subCategoryId: "",
      unit: "",
      updatedAt: "",
      usageRu: "",
      usageTm: "",
      waitListCount: "",
    });
  }

  const maxIndex = Math.max(
    0,
    extendedImages.length - (visibleCount ? visibleCount : 0)
  );
  const visibleImages = extendedImages.slice(
    index,
    index + (visibleCount ? visibleCount : 0)
  );

  const handleNext = () => {
    if (index < maxIndex) {
      setDirection(1);
      setPrevImages(
        data?.products
          ? data.products.slice(
              index,
              index + (visibleCount ? visibleCount : 0)
            )
          : []
      );
      setIndex((prev) => prev + (visibleCount ? visibleCount : 0));
    }
  };
  const handlePrev = () => {
    if (index > 0) {
      setDirection(-1);
      setPrevImages(
        data?.products
          ? data.products.slice(
              index,
              index + (visibleCount ? visibleCount : 0)
            )
          : []
      );
      setIndex((prev) => prev - (visibleCount ? visibleCount : 0));
    }
  };
  const handleNavigate = (item: imagesProps) => {
    if (item.barcode !== "") {
      navigate(`/product/${item.barcode}`);
    } else {
      navigate(`/category/products/${item.productStatus}`);
    }
  };

  return (
    <>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{ mt: 4, position: "relative", zIndex: 2 }}
      >
        <CustomSectionText fz={25} text={text} />
        <Buttons
          handlePrev={handlePrev}
          handleNext={handleNext}
          index={index}
          maxIndex={maxIndex}
        />
      </Stack>

      <Box sx={{ width: "100%", overflow: "hidden", textAlign: "center" }}>
        <Box
          sx={{
            width: "100%",
            height: 320,
            margin: "0 auto",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              zIndex: 0,
              gap: visibleCount && visibleCount < prevImages.length ? 0 : 10,
            }}
          >
            {prevImages.map((item, i) => (
              <Box
                key={`bg-${i}`}
                sx={{
                  width: 180,
                  height: 180,
                  overflow: "hidden",
                  display: i < visibleImages.length - 1 ? "block" : "none",
                }}
              >
                {item.imageOne !== "" && (
                  <CustomImageComponent
                    product={item}
                    notIsMobileHeight={180}
                  />
                )}

                {item.imageOne !== "" && (
                  <Stack
                    sx={{ p: 1, textAlign: "right", flexDirection: "column" }}
                  >
                    <CustomProductTextConatiner
                      textCategory={item?.category}
                      mainText={item.nameRu || "Нет названия"}
                      discountPrice={Number(item.discountValue) || 0}
                      sellPrice={Number(item.currentSellPrice) || 0}
                      discounted={Number(item.sellPrice) || 0}
                      decimals={0}
                    />
                  </Stack>
                )}
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              justifyContent:
                // visibleCount && visibleCount > visibleImages.length
                // ?
                "flex-start",
              // : "space-between",
              width: "100%",
              zIndex: 1,
              gap: visibleCount && visibleCount < visibleImages.length ? 0 : 10,
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {visibleImages.map((item, i) => {
                return (
                  <motion.div
                    key={index + "-" + i}
                    custom={direction}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={itemVariants}
                    style={{
                      width: 200,
                      height: 460,
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={() => handleNavigate(item as imagesProps)}
                    onMouseEnter={() => setShowCartButton(item.id)}
                    onMouseLeave={() => setShowCartButton(null)}
                  >
                    {item.imageOne !== "" && item && (
                      <Stack position="absolute" right={0} zIndex={100}>
                        <FavoriteButton product={item as any} />
                      </Stack>
                    )}
                    {item.imageOne !== "" &&
                      showCartButton == item.id &&
                      item && (
                        <Stack
                          position="absolute"
                          bottom={280}
                          right={10}
                          zIndex={100}
                          bgcolor={"#000"}
                          borderRadius="100%"
                        >
                          <AddToCartButton product={item} />
                        </Stack>
                      )}
                    {item.imageOne !== "" ? (
                      <CustomImageComponent
                        product={item}
                        notIsMobileHeight={180}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: 280,
                          display: "flex",
                          alignItems: "start",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          backgroundColor: "#fff",
                          ...hoverStyle,
                          gap: -2,
                        }}
                      >
                             
                             <CustomProductTextConatiner
                             textCategory={item?.category}
                             mainText={item.nameRu || "Больше популярных товаров"}
                             discountPrice={Number(item.discountValue) || 0}
                             sellPrice={Number(item.currentSellPrice) || 0}
                             discounted={Number(item.sellPrice) || 0}
                             decimals={0}
                             ta="left"
                             height={'60%'}
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
                        }}
                      >
                        <CustomProductTextConatiner
                          textCategory={item?.category}
                          mainText={item.nameRu || "Нет названия"}
                          discountPrice={Number(item.discountValue) || 0}
                          sellPrice={Number(item.currentSellPrice) || 0}
                          discounted={Number(item.sellPrice) || 0}
                          decimals={0}
                        />
                      </Stack>
                    ) : (
                      ""
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </>
  );
};
