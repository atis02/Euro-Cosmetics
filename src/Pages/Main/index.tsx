import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";

import { MainPageSwiper } from "../../Components/utils/swiper/MainPageSwiper";
import Story from "../../Components/Story";
import StoryButton from "./components/StoryButton";
import ProductSwiper from "../../Components/utils/productsSwiper/ProductsSwiper";
import { ActionSwiper } from "../../Components/utils/actionSwiper/actionSwiper";
import { MobileSwipeProducts } from "../../Components/utils/MobileSwipeProducts";
import { ProductLoading } from "./components/ProductLoading";

import { actionData } from "../../Components/utils/actionSwiper/constants";
import { BASE_URL } from "../../Fetcher/swrConfig";

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
  const [selectedStory, setSelectedStory] = useState<any>(null);

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

  const handleOpenStory = (story: any) => {
    setSelectedStory(story);
    setOpenStory(true);
  };

  const renderProducts = (
    data: any,
    error: any,
    loading: boolean,
    label: string,
    center?: boolean
  ) => {
    if (loading) return <ProductLoading />;
    if (isMobile && loading) return <ProductLoading isMobile />;
    if (isMobile)
      return (
        <MobileSwipeProducts
          products={data}
          text={label}
          isMobile
          p={1}
          mt={3}
          width="100vw"
          isLoading={loading}
        />
      );
    if (!error && data?.products?.length)
      return (
        <ProductSwiper
          text={label}
          data={data}
          error={error}
          isLoading={loading}
          center={center}
        />
      );
    return null;
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
            storyData?.stories?.map((story: any) => (
              <StoryButton
                key={story.id}
                imageUrl={`${BASE_URL}/${story.image}`}
                onClick={() => handleOpenStory(story)}
              />
            ))}
      </Stack>

      {selectedStory && openStory && (
        <Story
          open={openStory}
          stories={[selectedStory]}
          onClose={() => {
            setOpenStory(false);
            setSelectedStory(null);
          }}
        />
      )}

      {renderProducts(newData, newError, loadingNew, "новинки")}
      <ActionSwiper text="aкции" data={actionData} />
      {renderProducts(hitData, hitError, loadingHit, "хиты", false)}
      <ActionSwiper text="клиентские дни" data={actionData} />
    </Box>
  );
};

export default Main;
