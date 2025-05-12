import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCreative,
  Autoplay,
} from "swiper/modules";
import { swiperData, swiperDataMobile } from "./swiperData";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { West, East } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setTextColor } from "../../redux/reducers/swiperSlice";
import { FastAverageColor } from "fast-average-color";
import { CustomButton } from "../CustomButton";
import { mainPageTextDescStyle, mainPageTextStyle } from "../CustomStyles";

export const MainPageSwiper: React.FC = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorInside, setIsCursorInside] = useState(false);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fac = new FastAverageColor();
  const currentSlide = useSelector((state: any) => state.swiper.color);

  const detectBackgroundColor = (slideIndex: number) => {
    const slide = swiperRef.current?.slides[slideIndex];
    const imgElement = slide?.querySelector(
      ".swiper-img"
    ) as HTMLImageElement | null;

    if (imgElement) {
      fac
        .getColorAsync(imgElement)
        .then((color) => {
          const [r, g, b] = color.value;
          const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

          if (luminance < 128) {
            dispatch(setTextColor("#ffffff"));
          } else {
            dispatch(setTextColor("#000000"));
          }
        })
        .catch((e) => {
          console.warn("Error getting average color", e);
        });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursorPos({ x, y });

      if (x < rect.width * 0.25) {
        setHoverSide("left");
      } else if (x > rect.width * 0.75) {
        setHoverSide("right");
      } else {
        setHoverSide(null);
      }
    };
    const handleMouseEnter = () => setIsCursorInside(true);
    const handleMouseLeave = () => setIsCursorInside(false);
    container?.addEventListener("mousemove", handleMouseMove);
    container?.addEventListener("mouseenter", handleMouseEnter);
    container?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      container?.removeEventListener("mouseenter", handleMouseEnter);
      container?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleSlideChange = () => {
      const activeSlideIndex = swiperRef.current?.realIndex ?? 0;
      detectBackgroundColor(activeSlideIndex); // Detect color when slide changes
    };
    swiperRef.current?.on("slideChange", handleSlideChange);
    return () => {
      swiperRef.current?.off("slideChange", handleSlideChange);
    };
  }, []);

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <Stack
      ref={containerRef}
      style={{
        overflow: "hidden",
      }}
    >
      {hoverSide === "left" && (
        <div
          className="cursor-arrow prev"
          onClick={isMobile ? handleNext : handlePrev}
          style={{
            position: "absolute",
            background: "transparent",
            left: cursorPos.x - 20,
            top: cursorPos.y - 15,
            transform: "translateY(0)",
            color: "#000",
            fontSize: "2rem",
            zIndex: 10,
            cursor: "none",
            opacity: isCursorInside ? 1 : 0,
            pointerEvents: isCursorInside ? "auto" : "none",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <West sx={{ width: 40, height: 40, color: "#464646" }} />
        </div>
      )}

      {hoverSide === "right" && (
        <div
          className="cursor-arrow next"
          onClick={isMobile ? handlePrev : handleNext}
          style={{
            background: "transparent",
            position: "absolute",
            left: cursorPos.x - 20,
            top: cursorPos.y - 15,
            transform: "translateY(0)",
            color: "#000",
            fontSize: "2rem",
            zIndex: 10,
            cursor: "none",
            opacity: isCursorInside ? 1 : 0,
            pointerEvents: isCursorInside ? "auto" : "none",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <East sx={{ width: 40, height: 40, color: "#464646" }} />
        </div>
      )}
      {isMobile && <div className="swiper-pagination-mobile" />}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[
          Navigation,
          Pagination,
          !isMobile ? EffectCreative : Autoplay,
          Autoplay,
        ]}
        pagination={{
          el: isMobile ? ".swiper-pagination-mobile" : ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        }}
        // autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={false}
        effect={"creative"}
        creativeEffect={{
          prev: {
            translate: ["-30%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        speed={1000}
        slidesPerView={1}
        style={{ width: "100vw" }}
      >
        {isMobile
          ? swiperDataMobile.map((slide, index) => (
              <SwiperSlide key={`${slide.img}-${index}`}>
                <Stack
                  sx={{
                    minWidth: 280,
                    minHeight: 375,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {slide.img ? (
                    <img
                      src={slide.img}
                      alt="Slide"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "#fff",
                      }}
                      className="swiper-img"
                    />
                  ) : slide.video ? (
                    <video
                      src={slide.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "#fff",
                      }}
                      className="swiper-img"
                    ></video>
                  ) : (
                    ""
                  )}
                  <Stack
                    position="absolute"
                    justifyContent="space-between"
                    height="100%"
                    top="5%"
                    left="5%"
                  >
                    <Stack>
                      <Typography color={currentSlide} sx={mainPageTextStyle}>
                        {slide.title}
                      </Typography>
                      <Typography
                        color={currentSlide}
                        sx={mainPageTextDescStyle}
                      >
                        {slide.desc}
                      </Typography>
                    </Stack>
                    <CustomButton
                      isMobile={isMobile}
                      text="Перейти к бренду"
                      textColor="#fff"
                    />
                  </Stack>
                </Stack>
              </SwiperSlide>
            ))
          : swiperData.map((slide, index) => (
              <SwiperSlide key={`${slide.img}-${index}`}>
                <Stack
                  sx={{
                    minWidth: 280,
                    minHeight: 375,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {slide.img ? (
                    <img
                      src={slide.img}
                      alt="Slide"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "#fff",
                      }}
                      className="swiper-img"
                    />
                  ) : slide.video ? (
                    <video
                      src={slide.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "#fff",
                      }}
                      className="swiper-img"
                    ></video>
                  ) : (
                    ""
                  )}

                  <Stack position="absolute" top="40%" zIndex={10} left="50%">
                    <Typography color={currentSlide} sx={mainPageTextStyle}>
                      {slide.title}
                    </Typography>
                    <Typography color={currentSlide} sx={mainPageTextDescStyle}>
                      {slide.desc}
                    </Typography>
                    <CustomButton text="Перейти к бренду" textColor="#fff" />
                  </Stack>
                </Stack>
              </SwiperSlide>
            ))}
        {isMobile ? (
          <div className="swiper-pagination-mobile" />
        ) : (
          <div className="swiper-pagination" />
        )}
      </Swiper>
    </Stack>
  );
};
