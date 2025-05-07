import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, Stack, Typography } from "@mui/material";
import { images, itemVariants, VISIBLE_COUNT } from "./constants";
import { FC, useState } from "react";
import CustomSectionText from "../CustomSectionText";
import Buttons from "./Buttons";
import CustomContainerMain from "../CustomContainerMain";
import CustomProductTextConatiner from "../CustomProductTextConatiner";
import { hoverStyle } from "../CustomStyles";
import { East } from "@mui/icons-material";

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

const ProductSwiper: FC<Props> = ({ text }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [prevImages, setPrevImages] = useState<images[]>([]);
  const extendedImages = [...images];
  if (images.length % VISIBLE_COUNT !== 0) {
    extendedImages.push({
      image: "",
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

  return (
    <CustomContainerMain>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{ py: 2, px: 4, mb: 2, position: "relative", zIndex: 2 }}
      >
        <Stack minWidth={"5%"}></Stack>
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
                    }}
                  >
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
    </CustomContainerMain>
  );
};

export default ProductSwiper;
