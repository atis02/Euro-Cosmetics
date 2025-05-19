import { Stack } from "@mui/material";
import { FC } from "react";
interface Props {
  image: string;
  isMobile: boolean;
}
const BannerImage: FC<Props> = ({ isMobile, image }) => {
  return (
    <Stack
      height={isMobile ? 200 : "60vh"}
      zIndex={10}
      position="absolute"
      left={0}
      top={isMobile ? 67 : 0}
    >
      <Stack
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          alt=""
        />

        <Stack
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            pointerEvents: "none",
          }}
        />
      </Stack>
    </Stack>
  );
};

export default BannerImage;
