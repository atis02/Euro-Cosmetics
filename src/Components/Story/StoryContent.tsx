import { useEffect, useRef } from "react";

const StoryContent = ({ videoUrl, imageUrl, hasVideo, alt, action ,controls=false}: any) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (hasVideo && videoRef.current) {
      const video = videoRef.current;

      const onLoadedData = () => {
        video.play();
        action?.("play");
      };

      const onWaiting = () => {
        action?.("pause");
      };

      const onPlaying = () => {
        action?.("play");
      };

      video.addEventListener("loadeddata", onLoadedData);
      video.addEventListener("waiting", onWaiting);
      video.addEventListener("playing", onPlaying);

      return () => {
        video.removeEventListener("loadeddata", onLoadedData);
        video.removeEventListener("waiting", onWaiting);
        video.removeEventListener("playing", onPlaying);
      };
    }
  }, [hasVideo, action]);
  const handlePause = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    videoRef.current?.pause();
  };

  const handlePlay = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    videoRef.current?.play();
  };

  return hasVideo ? (
    <div
      onTouchStart={handlePause}
      onTouchEnd={handlePlay}
      onMouseDown={handlePause}
      onMouseUp={handlePlay}
      style={{ width: "100%", height: "100%" }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls={controls}
        crossOrigin="anonymous"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onClick={(e) => e.stopPropagation()} // prevent click from triggering next
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  ) : (
    <img
      src={imageUrl}
      crossOrigin="anonymous"
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      onClick={(e) => e.stopPropagation()} // just in case
    />
  );
};

export default StoryContent;
