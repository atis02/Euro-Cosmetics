import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { West, East, ControlPointOutlined } from "@mui/icons-material";
import { Product } from "./interfaces";
import { BASE_URL } from "../../../Fetcher/swrConfig";
import { ProductImageZoomModal } from "./ProductImageZoomModal";
import SwiperImgThumbs from "./SwiperImgThumbs";
import { ZoomedImg } from "./ZoomedImg";

export const ProductImagesSwiper: FC<Product> = ({ product, isLoading }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorInside, setIsCursorInside] = useState(false);
  const [hoverSide, setHoverSide] = useState<
    "left" | "right" | "center" | null
  >(null);
  const [openZoom, setOpenZoom] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

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
      } else if (x > rect.width * 0.26 && x < rect.width * 0.74) {
        setHoverSide("center");
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
  if (isLoading) {
    return;
  }
  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const swiperData = [
    { image: product.imageOne },
    { image: product.imageTwo || null },
    { image: product.imageThree || null },
    { image: product.imageFour || null },
    { image: product.imageFive || null },
  ];

  return (
    <Stack
      ref={containerRef}
      style={{
        overflow: "hidden",
        width: "100%",
        height: isMobile ? "10%" : 670,
        position: "relative",
      }}
    >
      {hoverSide === "left" && (
        <div
          className="cursor-arrow prev"
          onClick={isMobile ? handleNext : handlePrev}
          style={{
            position: "absolute",
            background: "transparent",
            left: cursorPos.x - 18,
            top: cursorPos.y - 12,
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
      {hoverSide === "center" && (
        <div
          className="cursor-arrow prev"
          onClick={() => setOpenZoom(true)}
          style={{
            position: "absolute",
            background: "transparent",
            left: cursorPos.x - 18,
            top: cursorPos.y - 12,
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
          <ControlPointOutlined
            sx={{ width: 40, height: 40, color: "#464646" }}
          />
        </div>
      )}
      {hoverSide === "right" && (
        <div
          className="cursor-arrow next"
          onClick={isMobile ? handlePrev : handleNext}
          style={{
            background: "transparent",
            position: "absolute",
            left: cursorPos.x - 18,
            top: cursorPos.y - 12,
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
        modules={[Navigation, Pagination, Autoplay, Thumbs]}
        pagination={{
          el: isMobile ? ".swiper-pagination-mobile" : ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        speed={1000}
        thumbs={{ swiper: thumbsSwiper }}
        slidesPerView={1}
        style={{ width: "100%" }}
      >
        {swiperData
          .filter((elem) => elem.image !== null)
          .map((slide, index) => (
            <SwiperSlide key={`${slide}-${index}`}>
              <Stack
                sx={{
                  minWidth: 280,
                  minHeight: isMobile ? 200 : 375,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={`${BASE_URL}/${slide.image}`}
                  alt="Slide"
                  crossOrigin="anonymous"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    backgroundColor: "#fff",
                  }}
                  className="swiper-img"
                />
              </Stack>
            </SwiperSlide>
          ))}
        {isMobile ? (
          <div className="swiper-pagination-mobile" />
        ) : (
          <div className="swiper-pagination" />
        )}
      </Swiper>

      <SwiperImgThumbs
        swiperData={swiperData}
        isMobile={isMobile}
        setThumbsSwiper={setThumbsSwiper}
      />
      <ProductImageZoomModal
        open={openZoom}
        onClose={() => setOpenZoom(false)}
        children={
          <ZoomedImg
            swiperData={swiperData}
            product={product}
            onClose={() => setOpenZoom(false)}
            isMobile={isMobile}
          />
        }
      />
    </Stack>
  );
};
