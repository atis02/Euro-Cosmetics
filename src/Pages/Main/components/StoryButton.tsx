import { Avatar, Box } from "@mui/material";
import { useState } from "react";

interface StoryButtonProps {
  imageUrl: string;
  onClick: () => void;
  seen?: boolean;
}

const StoryButton = ({ imageUrl, onClick, seen = false }: StoryButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      onClick();
      setIsClicked(false);
    }, 1200);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: 70,
        height: 70,
        position: "relative",
        cursor: "pointer",
      }}
    >
      {!seen && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "conic-gradient(from 180deg at 50% 50%, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5, #feda75)",
            p: "2px",
            animation: isClicked ? "spin 1.2s linear" : "none",
            zIndex: 1,
          }}
        />
      )}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <Avatar src={imageUrl} sx={{ width: 66, height: 66 }} />
      </Box>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(720deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default StoryButton;
