import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  images,
  itemVariants,
  VISIBLE_COUNT,
} from "./productsSwiper/constants";
import { FC, useState } from "react";
import { East } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomSectionText from "./CustomSectionText";
import Buttons from "./productsSwiper/Buttons";
import CustomProductTextConatiner from "./CustomProductTextConatiner";
import FavoriteButton from "./FavoriteButtonComponent";
import { hoverStyle } from "./CustomStyles";

interface Props {
  text: string;
}

interface images {
  image?: string;
  productStatus?: string;
  title: string;
  sellPrice?: number;
  discountPrice?: number;
  category?: string;
}

export const PopularProductsMini: FC<Props> = ({ text }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [prevImages, setPrevImages] = useState<images[]>([]);
  const extendedImages = [...images];
  const navigate = useNavigate();

  if (images.length % VISIBLE_COUNT !== 0) {
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
      title: "Ваша персональная подборка новинок",
    });
  }

  const maxIndex = Math.max(0, extendedImages.length - VISIBLE_COUNT);
  const visibleImages = extendedImages.slice(index, index + VISIBLE_COUNT);

  const handleNext = () => {
    if (index < maxIndex) {
      setDirection(1);
      setPrevImages(images.slice(index, index + VISIBLE_COUNT));
      setIndex((prev) => prev + VISIBLE_COUNT);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setDirection(-1);
      setPrevImages(images.slice(index, index + VISIBLE_COUNT));
      setIndex((prev) => prev - VISIBLE_COUNT);
    }
  };
  const handleNavigate = (item: images) => {
    navigate(`/product/${item.category}`);
    localStorage.setItem("productEuroCos", JSON.stringify(item));
  };
  return (
    <>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{ mt: 6, py: 1, position: "relative", zIndex: 2 }}
      >
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
              justifyContent: "space-between",
              width: "100%",
              zIndex: 0,
            }}
          >
            {prevImages.map((item, i) => (
              <Box
                key={`bg-${i}`}
                sx={{
                  width: 280,
                  height: 280,
                  overflow: "hidden",
                }}
              >
                <img
                  src={item?.image}
                  alt={`background-${i}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
                <Stack
                  sx={{ p: 1, textAlign: "right", flexDirection: "column" }}
                >
                  <CustomProductTextConatiner
                    textCategory={item.category || ""}
                    mainText={item.title}
                    discountPrice={item.discountPrice || 0}
                    sellPrice={item.sellPrice || 0}
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
              justifyContent: "space-between",
              width: "100%",
              zIndex: 1,
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
                    onClick={() => handleNavigate(item)}
                  >
                    <Stack position="absolute" right={0} zIndex={100}>
                      <FavoriteButton product={item} />
                    </Stack>
                    {item.image !== "" ? (
                      <img
                        src={item.image}
                        alt={`product-${i}`}
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
                        }}
                      >
                        <CustomProductTextConatiner
                          textCategory={item.category}
                          mainText={item.title}
                          discountPrice={item.discountPrice}
                          sellPrice={item.sellPrice}
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
