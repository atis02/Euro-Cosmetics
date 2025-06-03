import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { MainPageSwiper } from "../../Components/utils/swiper/MainPageSwiper";
import Story from "../../Components/Story/index";
import StoryButton from "./components/StoryButton";
import ProductSwiper from "../../Components/utils/productsSwiper/ProductsSwiper";
import { ActionSwiper } from "../../Components/utils/actionSwiper/actionSwiper";
import { MobileSwipeProducts } from "../../Components/utils/MobileSwipeProducts";
import useSWR from "swr";
import { actionData } from "../../Components/utils/actionSwiper/constants";
import { BASE_URL } from "../../Fetcher/swrConfig";

const Main: React.FC = () => {
  const [openStory, setOpenStory] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const url = BASE_URL + "/products/client";

  const fetchNewKey = JSON.stringify({
    url: url,
    body: { page: 1, limit: 10, productStatusId: 1 },
    method: "POST",
  });
  const fetchHitKey = JSON.stringify({
    url: url,
    body: { page: 1, limit: 10, productStatusId: 2 },
    method: "POST",
  });
  const fetchStoryKey = JSON.stringify({
    url: BASE_URL + "/stories/active",
    method: "GET",
  });
  const fetcher = (key: string) => {
    const { url, body, method } = JSON.parse(key);
    return fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  };

  const {
    data: newData,
    error: newError,
    isLoading: loadingNew,
  } = useSWR(fetchNewKey, fetcher);
  const {
    data: hitData,
    error: hitError,
    isLoading: loadingHit,
  } = useSWR(fetchHitKey, fetcher);
  const {
    data: storyData,
    error: storyError,
    isLoading: loadingStory,
  } = useSWR(fetchStoryKey, fetcher);
  return (
    <Box>
      <Stack>
        <MainPageSwiper />
      </Stack>
      <Stack direction="row" spacing={2} mt={2} justifyContent="center">
        {!loadingStory &&
          !storyError &&
          storyData.stories?.length &&
          storyData.stories?.map((elem: any) => (
            <StoryButton
              key={elem}
              imageUrl={`${BASE_URL}/${elem.image}`}
              onClick={() => setOpenStory(true)}
            />
          ))}
      </Stack>
      {!loadingStory && !storyError && storyData.stories?.length && (
        <Story
          open={openStory}
          stories={storyData?.stories}
          onClose={() => setOpenStory(false)}
        />
      )}
      {isMobile && !loadingNew ? (
        <MobileSwipeProducts
          products={newData}
          text="новинки"
          isMobile
          p={1}
          mt={3}
          width="100vw"
          isLoading={loadingNew}
        />
      ) : (
        !loadingNew &&
        !newError &&
        newData.products?.length && (
          <ProductSwiper
            text="новинки"
            data={newData}
            error={newError}
            isLoading={loadingNew}
          />
        )
      )}
      <ActionSwiper text="aкции" data={actionData} />
      {isMobile && !loadingHit ? (
        <MobileSwipeProducts
          products={hitData}
          isMobile
          text="хиты"
          p={1}
          width="100vw"
          isLoading={loadingHit}
        />
      ) : (
        !loadingHit &&
        !hitError &&
        hitData.products?.length && (
          <ProductSwiper
            text="хиты"
            data={hitData}
            error={hitError}
            isLoading={loadingHit}
            center={false}
          />
        )
      )}

      <ActionSwiper text="клиентские дни" data={actionData} />
    </Box>
  );
};

export default Main;
