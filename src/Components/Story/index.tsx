import Stories from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";
import { Dialog, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StoryInterface } from "../utils/interfaces";
import { BASE_URL } from "../../Fetcher/swrConfig";
import { useEffect, useState } from "react";
import StoryContent from "./StoryContent";

interface StoryModalProps {
  open: boolean;
  onClose: () => void;
  stories: StoryInterface[];
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

const StoryModal: React.FC<
  StoryModalProps & { currentIndex: number; onNextStory: () => void }
> = ({ open, onClose, stories, currentIndex, onNextStory }) => {
  const [storiesData, setStoriesData] = useState<Story[]>([]);

  useEffect(() => {
    const loadDurations = async () => {
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
    };

    if (open) {
      loadDurations();
    }
  }, [stories, open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 360,
          height: 640,
          maxWidth: "90vw",
          maxHeight: "90vh",
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "black",
        }}
      >
        {storiesData.length > 0 ? (
          <Stories
            stories={storiesData}
            currentIndex={currentIndex}
            defaultInterval={5000}
            width="100%"
            height="100%"
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
    </Dialog>
  );
};

export default StoryModal;
