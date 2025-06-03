import { FC } from "react";

interface Props {
  story: {
    url: string;
    type?: string;
  };
  action?: () => void;
}
const CustomStoryRenderer: FC<Props> = ({ story, action }) => {
  const isVideo = story.url.endsWith(".mp4") || story.type === "video";

  return isVideo ? (
    <video
      src={story.url}
      controls={false}
      autoPlay
      playsInline
      muted
      onEnded={action}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
      crossOrigin="anonymous"
    />
  ) : (
    <img
      src={story.url}
      onLoad={action}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
      crossOrigin="anonymous"
      alt=""
    />
  );
};

export default CustomStoryRenderer;
