import { Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
interface Props {
  isMobile?: boolean;
}
const Logo: FC<Props> = ({ isMobile }) => {
  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 0.25 }}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <img
          src="/logos/LogoMain.png"
          style={{
            width: isMobile ? "40px" : "50px",
            height: isMobile ? "40px" : "50px",
          }}
          alt="LogoMain"
        />
      </Link>
    </Typography>
  );
};

export default Logo;
