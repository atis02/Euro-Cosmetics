import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, Stack, Typography } from "@mui/material";
import { itemVariants, VISIBLE_COUNT } from "./constants";
import { FC, useState } from "react";
import CustomSectionText from "../CustomSectionText";
import Buttons from "./Buttons";
import CustomContainerMain from "../CustomContainerMain";
import CustomProductTextConatiner from "../CustomProductTextConatiner";
import { hoverStyle } from "../CustomStyles";
import { East } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteButton from "../FavoriteButtonComponent";
import { AddToCartButton } from "../AddToCartButton";
import { imagesProps } from "../interfaces";
import { images, Product } from "../../../Pages/Product/components/interfaces";
import { CustomImageComponent } from "../CustomImageComponent";

interface Props {
  isLoading: boolean;
  error: boolean | undefined | unknown;
  data: Product;
  text: string;
  center?: boolean;
}

const ProductSwiper: FC<Props> = ({
  isLoading,
  error,
  data,
  text,
  center = true,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [prevImages, setPrevImages] = useState<images[]>([]);
  const [showCartButton, setShowCartButton] = useState<string | null>("");
  const { id } = useParams();

  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  const products = Array.isArray(data?.products)
    ? data.products.filter((e: any) => e.barcode !== id)
    : [];
  const extendedImages = [...products];

  if (products.length % VISIBLE_COUNT !== 0) {
    extendedImages.push({
      image: "",
      stock: 1,
      feedBackNumb: 1,
      articule: "",
      desc: "",
      productStatus: "",
      sellPrice: 0,
      discountPrice: 0,
      category: "",
      nameRu: "Ваша персональная подборка новинок",
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
      title: "",
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

  const maxIndex = Math.max(0, extendedImages.length - VISIBLE_COUNT);
  const visibleImages = extendedImages.slice(index, index + VISIBLE_COUNT);

  const handleNext = () => {
    if (index < maxIndex) {
      setDirection(1);
      setPrevImages(
        data.products ? data.products.slice(index, index + VISIBLE_COUNT) : []
      );
      setIndex((prev) => prev + VISIBLE_COUNT);
    }
  };
  const handlePrev = () => {
    if (index > 0) {
      setDirection(-1);
      setPrevImages(
        data.products ? data.products.slice(index, index + VISIBLE_COUNT) : []
      );
      setIndex((prev) => prev - VISIBLE_COUNT);
    }
  };
  const handleNavigate = (item: imagesProps) => {
    navigate(`/product/${item.barcode}`);
  };

  return (
    <CustomContainerMain>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{ py: 2, px: 4, mb: 2, position: "relative", zIndex: 2 }}
      >
        {center ? <Stack minWidth={"5%"}></Stack> : ""}
        <CustomSectionText text={text} />
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
            height: 450,
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
              gap: prevImages.length > 3 ? 0 : 10,
            }}
          >
            {prevImages.map((item, i) => (
              <Box
                key={`bg-${i}`}
                sx={{
                  width: 280,
                  height: 280,
                  overflow: "hidden",
                  display: i < visibleImages.length - 2 ? "block" : "none",
                }}
              >
                <CustomImageComponent product={item} notIsMobileHeight="100%" />

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
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              zIndex: 1,
              gap: 10,
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
                      width: 280,
                      height: 450,
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={() => handleNavigate(item as imagesProps)}
                    onMouseEnter={() => setShowCartButton(item.barcode)}
                    onMouseLeave={() => setShowCartButton(null)}
                  >
                    {item && item.imageOne !== "" && (
                      <Stack position="absolute" right={0} zIndex={100}>
                        <FavoriteButton product={item as any} />
                      </Stack>
                    )}
                    {item.imageOne !== "" &&
                      showCartButton == item.barcode &&
                      item && (
                        <Stack
                          position="absolute"
                          bottom={190}
                          right={15}
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
                        notIsMobileHeight={280}
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
                          decimals={0}
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
                    {item.imageOne !== "" ? (
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
    </CustomContainerMain>
  );
};

export default ProductSwiper;
