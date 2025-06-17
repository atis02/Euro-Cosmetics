import { Box, Stack, Typography } from "@mui/material";
import { CustomContainerAll } from "../../Components/utils/CustomContainerAll";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types"; // Import Swiper class for type
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BASE_URL } from "../../Fetcher/swrConfig";
import { useRef } from "react";
import useSWR from "swr";
import { CustomPagesText } from "../../Components/utils/CustomPagesText";
import { hoverStyle } from "../../Components/utils/CustomStyles";
import { useNavigate } from "react-router-dom";
import { Brands } from "../../Components/Navbar/ui/NavCategories/interfaces";

const index = () => {
  const thumbsSwiperRef = useRef<SwiperClass | null>(null); 
  const navigate = useNavigate()
  const { data, isLoading } = useSWR({
    url: `/brands/fetch/admin`,
    method: "POST",
  });

  if (isLoading) {
    return (
      <div style={{ padding: "20px" }}>
        <>Loading...</>
      </div>
    );
  }

  return (
    <CustomContainerAll>
      <Box>
        <CustomPagesText text="бренды" />

        <Box sx={{ overflow: "hidden", width: "100%" }}>
          {!data.brands?.length ? (
            ""
          ) : (
            <Box
              sx={{
                height: {
                  lg: "170px",
                  md: "180px",
                  sm: "150px",
                  xs: "100%",
                },
              }}
            >
              <Swiper
                onSwiper={(swiper) => (thumbsSwiperRef.current = swiper)}
                slidesPerView={5}
                spaceBetween={5}
                autoplay={true}
                modules={[Navigation, Thumbs, Autoplay]}
                className="gallery-thumbs-small"
                loop={true}
                speed={3000}
                style={{ cursor: "pointer", height: "100%" ,}}
              >
                {data.brands && Array.isArray(data.brands)
                  ? data.brands?.map((partner: Brands, index: number) => (

                      <SwiperSlide
                        key={`small_banners_image_key${index}`} 
                        style={{
                          display:'flex',
                          flexDirection:'column',
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={()=>navigate(`/brands/${partner.name}`)}
                      >
                        <LazyLoadImage
                          src={`${BASE_URL}/${partner.image}`}
                          alt={`Thumbnail ${index + 1}`}
                          effect="blur"
                          style={{
                            width: "100%",
                            height: 150,
                            objectFit: "contain",
                          }}
                          crossOrigin="anonymous"
                        />
                        <Stack sx={hoverStyle}>
                          <Typography fontFamily='Graphic' fontSize={20} textAlign="center">
                            {partner.name}
                          </Typography>
                        </Stack>
                      </SwiperSlide>

                    ))
                  : null}
              </Swiper>
            </Box>
          )}
        </Box>
      </Box>
    </CustomContainerAll>
  );
};
export default index;
