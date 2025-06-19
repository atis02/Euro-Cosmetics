import Stories from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";
import { Dialog, Box, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StoryInterface } from "../utils/interfaces";
import { BASE_URL } from "../../Fetcher/swrConfig";
import { useEffect, useState } from "react";
import StoryContent from "./StoryContent";
// import { useTranslation } from "react-i18next";
import axios from "axios";
import Products from "../../Pages/CategoryProducts/components/Products/Products";
import { CustomButton } from "../utils/CustomButton";
import { useNavigate } from "react-router-dom";
import MobileProducts from "../../Pages/CategoryProducts/components/Products/MobileProducts";

interface StoryModalProps {
  open: boolean;
  onClose: () => void;
  stories?: StoryInterface[];
  url?: string;
  duration?: number;
  id?: number;
  isMobile?: boolean;
  isStory?:boolean
}

const getVideoDuration = async (url: string): Promise<number> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    return await new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = objectUrl;

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(video.duration || 8);
        console.log(video.duration);
      };

      video.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(8);
      };
    });
  } catch {
    return 8;
  }
};
interface OneStory {
  arrayOfProducts: any[];
  Category?: {
    nameRu: string;
    id: string;
  };
  SubCategory?: {
    nameRu: string;
    categoryId: string;
  };
}
const StoryModal: React.FC<
  StoryModalProps & { currentIndex: number; onNextStory?: () => void }
> = ({
  open,
  onClose,
  stories,
  currentIndex,
  onNextStory,
  url,
  duration,
  id,
  isMobile,
  isStory
}) => {
  const [storiesData, setStoriesData] = useState<Story[]>([]);
  const [data, setData] = useState<OneStory>({ arrayOfProducts: [] });
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const navigate = useNavigate();
  const mode = url && duration ? "single" : stories?.length ? "list" : null;
  // const { t } = useTranslation();
  useEffect(() => {
    if (!open) {
      setStoriesData([]);
      return;
    }
    const loadDurations = async () => {
      if (mode === "single" && url && duration) {
        const videoUrl = url;

        setStoriesData([
          {
            content: ({ action }: any) => (
              <StoryContent
                videoUrl={videoUrl}
                imageUrl={""}
                hasVideo={true}
                alt={""}
                action={action}
              />
            ),
            duration: duration * 1000 + 1000,
            header: {
              heading: "Видео",
              subheading: "",
              profileImage: "",
            },
          },
        ]);
      } else if (mode === "list" && stories?.length) {
        const updatedStories = await Promise.all(
          stories.map(async (elem) => {
            const hasVideo = elem.video && elem.video !== "null";
            const videoUrl = `${BASE_URL}/${elem.video}`;
            const imageUrl = `${BASE_URL}/${elem.image}`;

            const durationInSeconds = hasVideo
              ? await getVideoDuration(videoUrl)
              : 8;

            return {
              content: ({ action }: any) => (
                <StoryContent
                  videoUrl={videoUrl}
                  imageUrl={imageUrl}
                  hasVideo={hasVideo}
                  alt={elem.name}
                  action={action}
                />
              ),
              duration: durationInSeconds * 1000 + 1000,
              header: {
                heading: elem.name,
                subheading: elem.contentRu,
                profileImage: imageUrl,
              },
            };
          })
        );

        setStoriesData(updatedStories);
      }
    };

    if (open) {
      loadDurations();
    }
  }, [mode, stories, url, duration, open]);

  const getCategories = async () => {
    const res = await axios.get(`${BASE_URL}/categories/fetch/client`);
    setCategoriesData(res.data.categories);
  };
  useEffect(() => {
    if (!id) return;
    try {
      const getOneVideo = async () => {
        const res = await axios.get(`${BASE_URL}/minitwo/fetch/${id}`);
        setData(res.data);
      };
      getOneVideo();
      getCategories();
    } catch (error) {}
  }, [id]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        style: {
          minHeight: "90vh",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          overflow: "auto",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 360,
          height: 640,
          maxWidth: "90vw",
          minHeight: "90vh",
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "black",
          mt: 2,
        }}
      >
        {mode === "single" && url && duration && (
          <StoryContent
            videoUrl={url}
            imageUrl={""}
            hasVideo={true}
            alt={""}
            action={() => {}}
            controls={true}
          />
        )}

        {mode === "list" && storiesData.length > 0 ? (
          <Stories
            stories={storiesData}
            currentIndex={currentIndex}
            defaultInterval={5000}
            width="100%"
            onAllStoriesEnd={onClose}
            onStoryEnd={onNextStory}
            crossOrigin="anonymous"
          />
        ) : (
          <Box sx={{ color: "white", p: 2 }}>Загрузка...</Box>
        )}

        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            zIndex: 1000,
            pointerEvents: "auto",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {!isStory?data?.arrayOfProducts?.length ? (
        isMobile ? (
          <MobileProducts product={data?.arrayOfProducts ?? []} />
        ) : (
          <Products product={data?.arrayOfProducts ?? []} color={true} />
        )
      ) : (
        <Stack>
          <CustomButton
            text={`Перейти к ${
              data.Category?.nameRu
                ? "категорию"
                : data.SubCategory?.nameRu
                ? "подкатегорию"
                : ""
            }`}
            width={250}
            textColor="#fff"
            border="1px solid #fff"
            func={() => {
              const parts = [
                data.Category?.nameRu,
                data.SubCategory?.nameRu,
              ].filter(Boolean);
              if (data.Category?.nameRu) {
                navigate(`/category/${parts[0]}`);
              } else if (data.SubCategory?.nameRu) {
                const filtered = categoriesData.find(
                  (item: any) => item.id === data.SubCategory?.categoryId
                );
                navigate(`/category/${filtered.nameRu}/${parts[0]}`);
              }
            }}
          />
        </Stack>
      ):''}
    </Dialog>
  );
};

export default StoryModal;
