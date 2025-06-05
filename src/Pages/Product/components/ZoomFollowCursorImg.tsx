import React, { useRef, useState } from "react";

interface Props {
  src: string;
}
export const ZoomFollowCursorImg: React.FC<Props> = ({ src }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [transform, setTransform] = useState({
    scale: 1,
    origin: "center center",
  });

  const handleClick = () => {
    setIsZoomed((prev) => {
      const newZoom = !prev;
      setTransform({
        scale: newZoom ? 1.2 : 1,
        origin: "center center",
      });
      return newZoom;
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTransform({
      scale: 1.6,
      origin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    if (isZoomed) {
      setTransform({
        scale: 1.2,
        origin: "center center",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: isZoomed ? "zoom-out" : "zoom-in",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={src}
        alt="Zoomable"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transition: "transform 0.3s ease",
          transform: `scale(${transform.scale})`,
          transformOrigin: transform.origin,
        }}
        crossOrigin="anonymous"
      />
    </div>
  );
};
