import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import { MainPageSwiper } from "../../Components/utils/swiper/MainPageSwiper";
import Story from "../../Components/Story";
import StoryButton from "./components/StoryButton";
import { ActionSwiper } from "../../Components/utils/actionSwiper/actionSwiper";
import { BASE_URL } from "../../Fetcher/swrConfig";
import { useTranslation } from "react-i18next";
import { BlogerAdvicesSwiper } from "../../Components/utils/actionSwiper/BlogerAdvicesSwiper ";
import { RenderProducts } from "./components/RenderProducts";

const PRODUCT_URL = `${BASE_URL}/products/client`;

const createFetchKey = (body: object, method: string, url = PRODUCT_URL) =>
  JSON.stringify({ url, body, method });

const fetcher = async (key: string) => {
  const { url, body, method } = JSON.parse(key);
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
    ...(method !== "GET" && { body: JSON.stringify(body) }),
  };
  const response = await fetch(url, options);
  return response.json();
};

const Main: React.FC = () => {
  const [openStory, setOpenStory] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const {
    data: newData,
    error: newError,
    isLoading: loadingNew,
  } = useSWR(
    createFetchKey({ page: 1, limit: 10, productStatusId: 1 }, "POST"),
    fetcher
  );

  const {
    data: hitData,
    error: hitError,
    isLoading: loadingHit,
  } = useSWR(
    createFetchKey({ page: 1, limit: 10, productStatusId: 2 }, "POST"),
    fetcher
  );

  const {
    data: storyData,
    error: storyError,
    isLoading: loadingStory,
  } = useSWR(createFetchKey({}, "GET", `${BASE_URL}/stories/active`), fetcher);

  const {
    data: sales,
    error: salesError,
    isLoading: loadingSales,
  } = useSWR(createFetchKey({}, "GET", `${BASE_URL}/minione/active`), fetcher);
  const {
    data: adviceBloger,
    error: adviceBlogerError,
    isLoading: loadingAdviceBloger,
  } = useSWR(createFetchKey({}, "GET", `${BASE_URL}/minitwo/active`), fetcher);

  const handleOpenStory = (storyIndex: number) => {
    setCurrentStoryIndex(storyIndex);
    setOpenStory(true);
  };

  return (
    <Box>
      <Stack>
        <MainPageSwiper />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        mt={2}
        justifyContent="center"
        overflow="auto"
        height="85px"
      >
        {loadingStory
          ? Array.from({ length: isMobile ? 5 : 7 }).map((_, i) => (
              <Skeleton
                key={i}
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: "100%",
                  border: "1px solid lightgray",
                }}
              />
            ))
          : !storyError &&
            storyData?.stories?.map((story: any, index: number) => (
              <StoryButton
                key={story.id}
                imageUrl={`${BASE_URL}/${story.image}`}
                onClick={() => handleOpenStory(index)}
              />
            ))}
      </Stack>

      {openStory && storyData?.stories?.length > 0 && (
        <Story
          isStory={true}
          open={openStory}
          stories={storyData.stories}
          currentIndex={currentStoryIndex}
          onClose={() => {
            setOpenStory(false);
            setCurrentStoryIndex(0);
          }}
          onNextStory={() => {
            if (currentStoryIndex < storyData.stories.length - 1) {
              setCurrentStoryIndex(currentStoryIndex + 1);
            } else {
              setOpenStory(false);
              setCurrentStoryIndex(0);
            }
          }}
        />
      )}
      <RenderProducts
        data={newData}
        error={newError}
        loading={loadingNew}
        label={t("navbar.novinki")}
        isMobile={isMobile}
      />
      {!salesError && !loadingSales && sales.banners?.length && (
        <ActionSwiper text={`${t("navbar.aksiya")}`} data={sales.banners} />
      )}
      <RenderProducts
        data={hitData}
        error={hitError}
        loading={loadingHit}
        label={t("home.hits")}
      />
      {!adviceBlogerError &&
        !loadingAdviceBloger &&
        adviceBloger.banners?.length && (
          <BlogerAdvicesSwiper
            text={`${t("home.blogers")}`}
            data={adviceBloger.banners}
          />
        )}
    </Box>
  );
};

export default Main;
