import { Close } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import {
  mainColor,
  navIconStyles,
} from "../../../Components/utils/CustomStyles";
import { FC, useRef, useState } from "react";
import { images } from "./interfaces";
import { ProductTitleFeedBack } from "./ProductTitleFeedBack";
import { BASE_URL } from "../../../Fetcher/swrConfig";
import SwiperImgThumbs from "./SwiperImgThumbs";

export interface ImgData {
  image: string | null;
}
interface Props {
  product: images;
  onClose: () => void;
  swiperData: ImgData[];
  isMobile: boolean;
}

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ZoomFollowCursorImg } from "./ZoomFollowCursorImg";

export const ZoomedImg: FC<Props> = ({
  isMobile,
  swiperData,
  product,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleThumbClick = (index: number) => {
    imageRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setActiveIndex(index);
  };

  return (
    <Stack height="100vh" overflow="auto">
      <Stack alignItems="end" p={3} position="sticky" top={0}>
        <IconButton onClick={onClose} sx={{ mainColor }}>
          <Close sx={navIconStyles} />
        </IconButton>
      </Stack>

      <Stack mt={-5} width={{ lg: "80%" }} alignItems="end">
        <ProductTitleFeedBack product={product} />
      </Stack>

      <SwiperImgThumbs
        swiperData={swiperData}
        isMobile={isMobile}
        activeIndex={activeIndex}
        onThumbClick={handleThumbClick}
        isAllImg
      />

      <Stack gap={4} alignItems="center" py={4}>
        {swiperData
          .filter((elem) => elem.image !== null)
          .map((slide, index) => {
            const [ref, inView] = useInView({
              threshold: 0.5,
            });

            useEffect(() => {
              if (inView) {
                setActiveIndex(index);
              }
            }, [inView]);

            return (
              <Stack
                ref={(el) => {
                  imageRefs.current[index] = el;
                  ref(el);
                }}
                key={`${slide}-${index}`}
                sx={{
                  width: "80%",
                  minHeight: isMobile ? 200 : 375,
                  maxHeight: 810,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ZoomFollowCursorImg src={`${BASE_URL}/${slide.image}`} />
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};
