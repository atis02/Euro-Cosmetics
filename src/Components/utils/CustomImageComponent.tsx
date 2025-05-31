import { FC } from "react";
import { BASE_URL } from "../../Fetcher/swrConfig";
import { images } from "../../Pages/Product/components/interfaces";

interface Props {
  product: images;
  isMobile?: boolean;
  height?: number | string;
  notIsMobileHeight?: number | string;
  setShowFavorite?: (val: boolean) => void;
  cursor?: string;
}
export const CustomImageComponent: FC<Props> = ({
  height = 225,
  notIsMobileHeight = 140,
  product,
  isMobile,
  setShowFavorite,
  cursor = "pointer",
}) => {
  return (
    <img
      src={`${BASE_URL}/${product.imageOne}`}
      crossOrigin="anonymous"
      alt={product.imageOne}
      style={{
        width: "100%",
        height: isMobile ? height : notIsMobileHeight,
        objectFit: "cover",
        backgroundColor: "#fff",
        cursor: cursor,
      }}
      onMouseEnter={() => setShowFavorite && setShowFavorite(true)}
      onMouseLeave={() => setShowFavorite && setShowFavorite(false)}
    />
  );
};
