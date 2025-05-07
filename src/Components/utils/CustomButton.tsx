import { Button } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";
import { TrendingFlat } from "@mui/icons-material";
interface Props {
  isMobile?: boolean;
}
export const CustomButton: FC<Props> = ({ isMobile }) => {
  const currentSlide = useSelector((state: any) => state.swiper.color);

  return (
    <Button
      sx={{
        position: "relative",
        overflow: "hidden",
        color: currentSlide === "#ffffff" ? "#000" : "#fff",
        padding: "12px 20px",
        fontSize: "12px",
        maxWidth: 205,
        fontFamily: "Graphic",
        fontWeight: 400,
        backgroundColor: currentSlide === "#ffffff" ? "#fff" : "#000",
        borderRadius: "0",
        marginBottom: { lg: 0, md: 0, sm: 0, xs: 7 },
        transition: "color 0.4s ease-in-out",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: currentSlide === "#ffffff" ? "#000" : "#fff",
          transform: "scaleX(0)",
          transformOrigin: "right",
          transition: "transform 0.5s ease-in-out",
          zIndex: 1,
        },
        "&:hover::before": {
          transform: "scaleX(1)",
          transformOrigin: "left",
          backgroundColor:
            isMobile && currentSlide === "#ffffff"
              ? "#000"
              : currentSlide === "#ffffff"
              ? "#000"
              : "#fff",
        },
        "& span": {
          position: "relative",
          zIndex: 2,
          transition: "color 0.1s ease-in-out",
        },
        "&:hover span": {
          color:
            isMobile && currentSlide === "#ffffff"
              ? "#fff"
              : currentSlide === "#ffffff"
              ? "#fff"
              : "#000",
        },
      }}
    >
      <span>Перейти к бренду</span>
      <TrendingFlat
        sx={{
          position: "relative",
          zIndex: 2,
          marginLeft: 1,
          transition: "color 0.2s ease-in-out",
          color: currentSlide === "#000000" ? "#fff" : "#000",
          ".MuiButton-root:hover &": {
            color:
              isMobile && currentSlide === "#ffffff"
                ? "#fff"
                : currentSlide === "#000000"
                ? "#000"
                : "#fff",
          },
        }}
      />
    </Button>
  );
};
