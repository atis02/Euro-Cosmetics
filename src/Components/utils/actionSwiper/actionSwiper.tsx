import { Navigation, Parallax } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomSectionText from "../CustomSectionText";
import { FC, useRef, useState } from "react";
import Buttons from "../productsSwiper/Buttons";
import CustomContainerMain from "../CustomContainerMain";
import { hoverStyle, mainColor } from "../CustomStyles";
import { BASE_URL } from "../../../Fetcher/swrConfig";
import { useTranslation } from "react-i18next";
interface ImageData {
  headerRu: string;
  headerTm: string;
  descriptionRu: string;
  descriptionTm: string;
  image: string;
  date: string;
  startDate: string;
  endDate: string;
}

interface Props {
  text: string;
  data: ImageData[];
}

export const ActionSwiper: FC<Props> = ({ text, data }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isHovered, setIsHovered] = useState<number>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const handleNext = () => {
    swiperRef.current?.slideNext();
  };
  const { i18n } = useTranslation();
  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };
  console.log(i18n.language);

  const getTitle = (nameTm: string, nameRu: string) => {
    const currentLanguage = i18n.language;
    switch (currentLanguage) {
      case "ru":
        return nameRu;
      case "tkm":
        return nameTm;
      default:
        return nameRu;
    }
  };
  return (
    <>
      <CustomContainerMain>
        <Stack
          justifyContent={{
            lg: "space-between",
            md: "space-between",
            sm: "space-between",
            xs: "flex-start",
          }}
          alignItems="center"
          direction="row"
          sx={{
            ml: -7,
            px: 4,
            mb: { lg: 2, md: 2, sm: 2, xs: 0 },
            position: "relative",
            zIndex: 2,
          }}
        >
          <Stack minWidth={"5%"}></Stack>
          <CustomSectionText text={text} />
          {!isMobile && (
            <Buttons
              handlePrev={handlePrev}
              handleNext={handleNext}
              maxIndex={data.length - 1}
            />
          )}
        </Stack>
      </CustomContainerMain>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation, Parallax]}
        spaceBetween={isMobile ? 10 : 70}
        slidesPerView={isMobile ? 1.2 : 1.7}
        centeredSlides={isMobile ? false : true}
        loop={true}
        speed={1000}
        parallax={true}
        initialSlide={2}
        pagination={{ clickable: true }}
        watchSlidesProgress
        style={{
          width: "100%",
          paddingLeft: isMobile ? 0 : "5%",
          paddingRight: isMobile ? 0 : "5%",
          ...hoverStyle,
          overflow: "hidden",
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
                src={`${BASE_URL}/${slide.image}`}
                alt={slide.image}
                style={{
                  width: "100%",
                  height: "70%",
                  objectFit: "cover",
                }}
                crossOrigin="anonymous"
              />
              <Stack direction="row" justifyContent="space-around" width="100%">
                <Box data-swiper-parallax="-40%" sx={{ pointerEvents: "auto" }}>
                  <Typography
                    fontWeight={500}
                    fontFamily="Graphic"
                    fontSize={isMobile ? 30 : 60}
                    sx={{
                      mt: isMobile ? 1 : -2,
                      ml: isMobile ? 2 : 0,
                      transition: "all 0.3s",
                      color: isHovered == index ? mainColor : "black",
                      transform:
                        isHovered == index ? "scale(1.02)" : "scale(1)",
                    }}
                  >
                    {getTitle(slide.headerTm, slide.headerRu)}
                  </Typography>

                  <Box
                    fontSize={16}
                    sx={{
                      ml: isMobile ? 2 : 0,
                    }}
                    fontWeight={400}
                  >
                    {getTitle(slide.descriptionTm, slide.descriptionRu)}
                  </Box>
                </Box>
                <Box
                  data-swiper-parallax="-40%"
                  sx={{
                    mt: isMobile ? 1 : -2,
                  }}
                  fontSize={isMobile ? 15 : 20}
                  fontWeight={500}
                >
                  {new Date(slide.startDate).getDate()} -{" "}
                  {new Date(slide.endDate).getDate()}{" "}
                  {new Date(slide.endDate).toLocaleDateString("ru", {
                    month: "long",
                  })}
                </Box>
              </Stack>
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
