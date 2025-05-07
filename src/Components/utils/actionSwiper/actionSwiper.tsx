import { Navigation, Parallax } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Box, Stack, Typography } from "@mui/material";
import CustomSectionText from "../CustomSectionText";
import { FC, useRef, useState } from "react";
import Buttons from "../productsSwiper/Buttons";
import CustomContainerMain from "../CustomContainerMain";
import { hoverStyle, mainColor } from "../CustomStyles";
interface ImageData {
  title: string;
  desc: string;
  image: string;
  date: string;
}

interface Props {
  text: string;
  data: ImageData[];
}

export const ActionSwiper: FC<Props> = ({ text, data }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isHovered, setIsHovered] = useState<number>(0);

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <>
      <CustomContainerMain>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          sx={{ px: 4, mb: 2, position: "relative", zIndex: 2 }}
        >
          <Stack minWidth={"5%"}></Stack>
          <CustomSectionText text={text} />
          <Buttons
            handlePrev={handlePrev}
            handleNext={handleNext}
            maxIndex={data.length - 1}
          />
        </Stack>
      </CustomContainerMain>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation, Parallax]}
        spaceBetween={70}
        slidesPerView={1.7}
        centeredSlides={true}
        loop={true}
        speed={1000}
        parallax={true}
        initialSlide={2}
        pagination={{ clickable: true }}
        watchSlidesProgress
        style={{
          paddingLeft: "5%",
          paddingRight: "5%",
          ...hoverStyle,
        }}
      >
        {data.map((slide, index) => (
          <SwiperSlide
            key={index}
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(index)}
          >
            <Stack
              sx={{
                maxWidth: 880,
                minHeight: 350,
                display: "flex",
                alignItems: "start",
              }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  width: "100%",
                  height: "70%",
                  objectFit: "cover",
                }}
              />
              <Stack direction="row" justifyContent="space-around" width="100%">
                <Box data-swiper-parallax="-40%" sx={{ pointerEvents: "auto" }}>
                  <Typography
                    fontWeight={500}
                    fontFamily="Graphic"
                    fontSize={60}
                    sx={{
                      mt: -2,
                      transition: "all 0.3s",
                      color: isHovered == index ? mainColor : "black",
                      transform:
                        isHovered == index ? "scale(1.02)" : "scale(1)",
                    }}
                  >
                    {slide.title}
                  </Typography>

                  <Box fontSize={16} fontWeight={400}>
                    {slide.desc}
                  </Box>
                </Box>
                <Box data-swiper-parallax="-40%" fontSize={20} fontWeight={500}>
                  {slide.date}
                </Box>
              </Stack>
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
