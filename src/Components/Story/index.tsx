import React from "react";
import Stories from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";
import { Dialog, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StoryInterface } from "../utils/interfaces";
import { BASE_URL } from "../../Fetcher/swrConfig";

interface StoryModalProps {
  open: boolean;
  onClose: () => void;
  stories: StoryInterface[];
}

const StoryModal: React.FC<StoryModalProps> = ({ open, onClose, stories }) => {
  const storiesData: Story[] = stories.map((elem) => ({
    url: `${BASE_URL}/${elem.video}`,
    duration: 5000,
    header: {
      heading: elem.name,
      subheading: elem.contentRu,
      profileImage: elem.image,
    },
  }));

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
        <Stories
          stories={storiesData}
          defaultInterval={8000}
          width="100%"
          height="100%"
          onAllStoriesEnd={onClose}
          // crossOrigin="anonymous"
        />

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
