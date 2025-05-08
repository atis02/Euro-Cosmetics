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
        <img
          src="/logos/LogoMain.png"
          style={{
            width: "50px",
            height: "50px",
          }}
          alt="LogoMain"
        />
      </Link>
    </Typography>
  );
};

export default Logo;
