import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { MainPageSwiper } from "../../Components/utils/swiper/MainPageSwiper";
import Story from "../../Components/Story/index";
import StoryButton from "./components/StoryButton";
import ProductSwiper from "../../Components/utils/productsSwiper/ProductsSwiper";
import { ActionSwiper } from "../../Components/utils/actionSwiper/actionSwiper";
import { data } from "../../Components/utils/actionSwiper/constants";
import { MobileSwipeProducts } from "../../Components/utils/MobileSwipeProducts";
import { images } from "../../Components/utils/productsSwiper/constants";

const Main: React.FC = () => {
  const [openStory, setOpenStory] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box>
      <Stack>
        <MainPageSwiper />
      </Stack>
      <Stack direction="row" spacing={2} mt={2} justifyContent="center">
        {[1, 2, 4, 5, 6].map((elem) => (
          <StoryButton
            key={elem}
            imageUrl="/story/story.webp"
            onClick={() => setOpenStory(true)}
          />
        ))}
      </Stack>

      <Story open={openStory} onClose={() => setOpenStory(false)} />
      {isMobile ? (
        <MobileSwipeProducts
          products={images}
          text="новинки"
          isMobile
          p={1}
          mt={3}
          width="100vw"
        />
      ) : (
        <ProductSwiper text="новинки" />
      )}
      <ActionSwiper text="aкции" data={data} />
      {isMobile ? (
        <MobileSwipeProducts
          products={images}
          isMobile
          text="хиты"
          p={1}
          width="100vw"
        />
      ) : (
        <ProductSwiper text="хиты" />
      )}

      <ActionSwiper text="клиентские дни" data={data} />
    </Box>
  );
};

export default Main;
