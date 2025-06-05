import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { FC } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { ImgData } from "./ZoomedImg";
import { BASE_URL } from "../../../Fetcher/swrConfig";

type Props = {
  isMobile: boolean;
  swiperData: ImgData[];
  activeIndex?: number;
  setThumbsSwiper?: React.Dispatch<React.SetStateAction<SwiperClass | null>>;
  onThumbClick?: (index: number) => void;
  isAllImg?: boolean;
};

const SwiperImgThumbs: FC<Props> = ({
  swiperData,
  isMobile,
  activeIndex,
  onThumbClick,
  setThumbsSwiper,
  isAllImg,
}) => {
  return (
    <>
      {!isMobile && (
        <Swiper
          direction="vertical"
          onSwiper={setThumbsSwiper}
          spaceBetween={0}
          slidesPerView={isAllImg ? 5 : 4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs, Navigation]}
          style={{
            width: 100,
            height: isAllImg ? 400 : 310,
            left: 20,
            position: "absolute",
            top: "20%",
            zIndex: 100,
          }}
          navigation={{
            nextEl: ".swiper-button-next-thumbs",
            prevEl: ".swiper-button-prev-thumbs",
          }}
        >
          {swiperData
            .filter((elem) => elem.image !== null)
            .map((slide, index) => (
              <SwiperSlide
                key={`thumb-${index}`}
                className="swiper-slide-thumb"
                onClick={() => onThumbClick && onThumbClick(index)}
              >
                <img
                  src={`${BASE_URL}/${slide.image}`}
                  alt={`thumb-${index}`}
                  style={{
                    width: 68,
                    height: 68,
                    objectFit: "cover",
                    cursor: "pointer",
                    border:
                      activeIndex === index
                        ? "2px solid #1976d2"
                        : "1px solid #ccc",
                  }}
                  crossOrigin="anonymous"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
      {!isMobile && !isAllImg && (
        <div
          style={{
            position: "absolute",
            top: "calc(20% - 40px)",
            left: 30,
            zIndex: 101,
            cursor: "pointer",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            width: 40,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: "70%",
            borderRadius: 100,
            backdropFilter: "blur(38px)",
          }}
          className="swiper-button-prev-thumbs"
        >
          <ExpandLess style={{ color: "#000" }} />
        </div>
      )}
      {!isMobile && !isAllImg && (
        <div
          style={{
            position: "absolute",
            top: `calc(20% + 310px)`,
            left: 30,
            zIndex: 101,
            cursor: "pointer",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            width: 40,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: "70%",
            borderRadius: 100,
            backdropFilter: "blur(38px)",
          }}
          className="swiper-button-next-thumbs"
        >
          <ExpandMore style={{ color: "#000" }} />
        </div>
      )}
    </>
  );
};

export default SwiperImgThumbs;
