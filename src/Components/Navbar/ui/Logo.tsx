import { Typography } from "@mui/material";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mainColor } from "../../utils/CustomStyles";
interface Props {
  isMobile?: boolean;
}
const Logo: FC<Props> = ({ isMobile }) => {
  const [isHovered, setisHovered] = useState(false);
  const currentSlide = useSelector((state: any) => state.swiper.color);
  const currentTextColor = useSelector(
    (state: any) => state.swiper.colorNavbarText
  );
  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 0.25 }}>
      <Link
        to="/"
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <svg
          stroke="none"
          width="30px"
          height="30px"
          fill={
            isHovered
              ? mainColor
              : isMobile
              ? "#000"
              : currentTextColor
              ? "#000"
              : currentSlide
          }
          viewBox="0 0 26 26"
          style={{
            transition: "fill 0.3s ease",
          }}
        >
          <path
            fillRule="evenodd"
            stroke="none"
            d="M13.73 9.31a4.8 4.8 0 0 1-.73 2.56 4.8 4.8 0 0 1-.73-2.56V9.1c0-.94.27-1.82.73-2.56.46.74.73 1.62.73 2.56v.21zm0 8.06c0 .94-.27 1.82-.73 2.56a4.81 4.81 0 0 1-.73-2.56v-.21c0-.94.27-1.82.73-2.56a4.8 4.8 0 0 1 .73 2.56v.21zM23 4.36V2.82h-6.14A6.05 6.05 0 0 0 13 4.24a6.06 6.06 0 0 0-3.87-1.42H3v1.54h6.13a4.5 4.5 0 0 1 2.82 1 6.38 6.38 0 0 0-1.23 3.78v.3c0 .6.08 1.18.23 1.73a5.96 5.96 0 0 0-1.84-.3H3v1.55h6.13c.95 0 1.84.3 2.58.81a4.47 4.47 0 0 1-2.58.82H3v1.7h6.1a6 6 0 0 0 1.85-.28 6.47 6.47 0 0 0-.23 1.73v.29c0 1.37.42 2.64 1.15 3.68a4.48 4.48 0 0 1-2.74.94H3v1.7h6.1A6.05 6.05 0 0 0 13 22.4a6.05 6.05 0 0 0 3.9 1.43H23v-1.7h-6.13a4.48 4.48 0 0 1-2.75-.95 6.38 6.38 0 0 0 1.17-3.68v-.29c0-.6-.09-1.18-.24-1.73a6.04 6.04 0 0 0 1.84.28H23v-1.7h-6.13c-.95 0-1.84-.3-2.58-.82a4.49 4.49 0 0 1 2.58-.81H23v-1.54h-6.1a5.97 5.97 0 0 0-1.86.29c.16-.56.25-1.14.25-1.74v-.29a6.39 6.39 0 0 0-1.24-3.78 4.49 4.49 0 0 1 2.82-1H23z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
    </Typography>
  );
};

export default Logo;
