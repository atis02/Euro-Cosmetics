import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCreative,
  Autoplay,
} from "swiper/modules";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { West, East } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { CustomButton } from "../CustomButton";
import { mainPageTextDescStyle, mainPageTextStyle } from "../CustomStyles";
import useSWR from "swr";
import { BASE_URL } from "../../../Fetcher/swrConfig";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

export const MainPageSwiper: React.FC = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorInside, setIsCursorInside] = useState(false);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const currentSlide = useSelector((state: any) => state.swiper.color);
  const { data, error, isLoading } = useSWR({
    url: `/banners/active`,
  });

  useEffect(() => {
    if (isLoading) return;

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
  }, [isLoading]);

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };
  if (isLoading) {
    return (
      <Stack width="99vw" height={isMobile ? "68vh" : "87vh"}>
        <Skeleton style={{ width: "100%", height: "68vh" }} />
      </Stack>
    );
  }
  if (error) {
    return;
  }
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
      {isMobile ? <div className="swiper-pagination-mobile" /> : ""}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
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
        autoplay={{ delay: 6000, disableOnInteraction: false }}
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
        style={{
          width: "100vw",
          height: !isMobile ? "87vh" : "",
          marginTop: isMobile ? 65 : 0,
        }}
      >
        {isMobile
          ? data?.banners
              .filter((item: any) => item.mobileImage !== null)
              .map((slide: any, index: number) => (
                <SwiperSlide key={`${slide.img}-${index}`}>
                  <Stack
                    sx={{
                      minWidth: 280,
                      minHeight: 375,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {slide.mobileImage !== null ? (
                      <img
                        src={`${BASE_URL}/${slide.mobileImage}`}
                        alt="Slide"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          backgroundColor: "#fff",
                        }}
                        crossOrigin="anonymous"
                        className="swiper-img"
                      />
                    ) : slide.video !== null ? (
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
                          {slide.name}
                        </Typography>
                        <Typography
                          color={currentSlide}
                          sx={mainPageTextDescStyle}
                        >
                          {slide.desc}
                        </Typography>
                      </Stack>
                      <CustomButton
                      text={`Перейти к ${
                        slide.Category?.nameRu
                          ? "категории"
                          : slide.SubCategory?.nameRu
                          ? "подкатегории"
                          : slide.Segment?.nameRu
                          ? "сегментам"
                          : slide.ProductsArray?.length
                          ? "товарам"
                          : slide.Product?.id
                          ? "товару"
                          : ""
                      }`}
                      width="auto"
                      textColor="#fff"
                      func={() => {
                        if (slide.Product !== null) {
                          return navigate(`/product/${slide.Product.barcode}`);
                        }
                        const parts = [
                          slide.Category?.nameRu,
                          slide.SubCategory?.nameRu,
                          slide.Segment?.nameRu,
                        ].filter(Boolean);

                        if (parts.length) {
                          navigate(`/category/${parts.join("/")}`);
                        }
                      }}
                    />
                    </Stack>
                  </Stack>
                </SwiperSlide>
              ))
          : data?.banners.map((slide: any, index: number) => (
              <SwiperSlide key={`${slide.image}-${index}`}>
                <Stack
                  sx={{
                    minWidth: 280,
                    minHeight: 375,
                    display: "flex",
                    alignItems: "center",
                    height: "87vh",
                  }}
                >
                  {slide.image ? (
                    <img
                      src={`${BASE_URL}/${slide.image}`}
                      alt="Slide"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "#fff",
                      }}
                      className="swiper-img"
                      crossOrigin="anonymous"
                    />
                  ) : slide.video !== null ? (
                    <video
                      src={`${BASE_URL}/${slide.video}`}
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
                      {slide.name}
                    </Typography>
                    <Typography color={currentSlide} sx={mainPageTextDescStyle}>
                      {slide.desc}
                    </Typography>
                    <CustomButton
                      text={`Перейти к ${
                        slide.Category?.nameRu
                          ? "категории"
                          : slide.SubCategory?.nameRu
                          ? "подкатегории"
                          : slide.Segment?.nameRu
                          ? "сегментам"
                          : slide.ProductsArray?.length
                          ? "товарам"
                          : slide.Product?.id
                          ? "товару"
                          : ""
                      }`}
                      width="auto"
                      textColor="#fff"
                      func={() => {
                        if (slide.Product !== null) {
                          return navigate(`/product/${slide.Product.barcode}`);
                        }
                        const parts = [
                          slide.Category?.nameRu,
                          slide.SubCategory?.nameRu,
                          slide.Segment?.nameRu,
                        ].filter(Boolean);

                        if (parts.length) {
                          navigate(`/category/${parts.join("/")}`);
                        }
                      }}
                    />
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
