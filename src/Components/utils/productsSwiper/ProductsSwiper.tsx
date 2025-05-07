import { motion, AnimatePresence } from "framer-motion";
import { Box, Stack } from "@mui/material";
import { images, itemVariants, VISIBLE_COUNT } from "./constants";
import { FC, useState } from "react";
import CustomSectionText from "../CustomSectionText";
import Buttons from "./Buttons";
import CustomContainerMain from "../CustomContainerMain";

import CustomProductTextConatiner from "../CustomProductTextConatiner";

interface Props {
  text: string;
}
interface images {
  image: string;
  productStatus: string;
  title: string;
  sellPrice: number;
  discountPrice: number;
  category: string;
}
const ProductSwiper: FC<Props> = ({ text }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [prevImages, setPrevImages] = useState<images[]>([]);
  const maxIndex = Math.max(0, images.length - VISIBLE_COUNT);
  const visibleImages = images.slice(index, index + VISIBLE_COUNT);

  const handleNext = () => {
    if (index < maxIndex) {
      setDirection(1);
      setPrevImages(images.slice(index, index + VISIBLE_COUNT)); // сохраняем весь объект
      setIndex((prev) => prev + VISIBLE_COUNT);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setDirection(-1);
      setPrevImages(images.slice(index, index + VISIBLE_COUNT)); // сохраняем весь объект
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
                  src={item.image}
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
                    textCategory={item.category}
                    mainText={item.title}
                    discountPrice={item.discountPrice}
                    sellPrice={item.sellPrice}
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
              {visibleImages.map((item, i) => (
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
                  <img
                    src={item.image}
                    alt={`product-${i}`}
                    style={{
                      width: "100%",
                      height: 280,
                      objectFit: "cover",
                    }}
                  />

                  <Stack
                    sx={{ p: 1, textAlign: "right", flexDirection: "column" }}
                  >
                    <CustomProductTextConatiner
                      textCategory={item.category}
                      mainText={item.title}
                      discountPrice={item.discountPrice}
                      sellPrice={item.sellPrice}
                    />
                  </Stack>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </CustomContainerMain>
  );
};

export default ProductSwiper;
