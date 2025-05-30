import { FC } from "react";
import { Subcategory } from "../../../Components/Navbar/ui/NavCategories/interfaces";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import CustomProductText from "../../../Components/utils/CustomProductText";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { BASE_URL } from "../../../Fetcher/swrConfig";

type Props = {
  subCategories: Subcategory[];
};

const SubCategories: FC<Props> = ({ subCategories }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        freeMode={true}
        modules={[FreeMode]}
        style={{
          paddingBottom: 10,
          paddingLeft: 20,
        }}
      >
        {subCategories.map((subcategory, index) => (
          <SwiperSlide key={index} style={{ width: "auto" }}>
            <Box
              component={Link}
              to={subcategory.nameRu}
              sx={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                border: "1px solid gray",
                borderRadius: "100px",
                pr: 2,
                gap: 2,
                minWidth: 160,
                pl: 0,
              }}
            >
              <img
                crossOrigin="anonymous"
                alt={`${BASE_URL}/${subcategory.image}`}
                src={
                  `${BASE_URL}/${subcategory.image}` || "/logos/LogoMain.png"
                }
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "100%",
                  objectFit: "contain",
                }}
              />
              <CustomProductText text={subcategory.nameRu} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SubCategories;
