import React from "react";
import Stories from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";
import { Dialog, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface StoryModalProps {
  open: boolean;
  onClose: () => void;
}

const stories: Story[] = [
  {
    url: "/story/story.webp",
    duration: 5000,
    header: {
      heading: "Splat biohack",
      subheading: "2h ago",
      profileImage: "/story/story.webp",
    },
  },
  {
    url: "/story/story2.webp",
    duration: 10000,
    header: {
      heading: "test",
      subheading: "2h ago",
      profileImage: "/story/story2.webp",
    },
  },
  {
    url: "/story/story3png.png",
    duration: 10000,
    header: {
      heading: "test2",
      subheading: "1h ago",
      profileImage: "/story/story3png.png",
    },
  },
  {
    url: "/story/story4.mp4",
    type: "video",
    duration: 15000,
    header: {
      heading: "test4",
      subheading: "1h ago",
      profileImage: "/story/story3png.png",
    },
  },
];

const StoryModal: React.FC<StoryModalProps> = ({ open, onClose }) => {
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
          stories={stories}
          defaultInterval={8000}
          width="100%"
          height="100%"
          onAllStoriesEnd={onClose}
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
