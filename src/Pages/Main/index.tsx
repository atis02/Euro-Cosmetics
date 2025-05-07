import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import { MainPageSwiper } from "../../Components/utils/swiper/MainPageSwiper";
import Story from "../../Components/Story/index";
import StoryButton from "./components/StoryButton";
import ProductSwiper from "../../Components/utils/productsSwiper/ProductsSwiper";

const Main: React.FC = () => {
  const [openStory, setOpenStory] = useState(false);

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
      <ProductSwiper text="новинки" />
    </Box>
  );
};

export default Main;
