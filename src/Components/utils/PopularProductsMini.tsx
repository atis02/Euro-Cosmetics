import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, Stack, Typography } from "@mui/material";
import { images, itemVariants } from "./productsSwiper/constants";
import { FC, useState } from "react";
import { East } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomSectionText from "./CustomSectionText";
import Buttons from "./productsSwiper/Buttons";
import CustomProductTextConatiner from "./CustomProductTextConatiner";
import FavoriteButton from "./FavoriteButtonComponent";
import { hoverStyle } from "./CustomStyles";
import { AddToCartButton } from "./AddToCartButton";

interface Props {
  text: string;
  visibleCount?: number;
}

interface images {
  image?: string;
  productStatus?: string;
  title: string;
  sellPrice?: number;
  discountPrice?: number;
  category?: string;
}

export const PopularProductsMini: FC<Props> = ({ text, visibleCount = 4 }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [prevImages, setPrevImages] = useState<images[]>([]);
  const extendedImages = [...images];
  const navigate = useNavigate();
  const [showCartButton, setShowCartButton] = useState<string | null>("");

  if (images.length % visibleCount !== 0) {
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

  const maxIndex = Math.max(0, extendedImages.length - visibleCount);
  const visibleImages = extendedImages.slice(index, index + visibleCount);

  const handleNext = () => {
    if (index < maxIndex) {
      setDirection(1);
      setPrevImages(images.slice(index, index + visibleCount));
      setIndex((prev) => prev + visibleCount);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setDirection(-1);
      setPrevImages(images.slice(index, index + visibleCount));
      setIndex((prev) => prev - visibleCount);
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
              justifyContent: "space-between",
              width: "100%",
              zIndex: 0,
            }}
          >
            {prevImages.map((item, i) => (
              <Box
                key={`bg-${i}`}
                sx={{
                  width: 180,
                  height: 180,
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
            <AnimatePresence initial={false} custom={direction}>
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
                      width: 180,
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
                    <Stack position="absolute" right={0} zIndex={100}>
                      <FavoriteButton product={item} />
                    </Stack>
                    {showCartButton == item.articule && (
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
                    {item.image !== "" ? (
                      <img
                        src={item.image}
                        alt={`product-${i}`}
                        style={{
                          width: "100%",
                          height: 180,
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
                          fz={14}
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
