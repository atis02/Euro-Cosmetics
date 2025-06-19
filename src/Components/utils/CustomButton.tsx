import { Button } from "@mui/material";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { TrendingFlat } from "@mui/icons-material";
interface Props {
  isMobile?: boolean;
  text: string | ReactNode;
  textColor?: string;
  width?: number | string;
  showIcon?: boolean;
  height?: number | string;
  func?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  dontChange?: boolean;
}
export const CustomButton: FC<Props> = ({
  isMobile,
  text,
  textColor = "#fff",
  width = 205,
  height,
  showIcon = true,
  func,
  dontChange = false,
}) => {
  const currentSlideColor = useSelector((state: any) => state.swiper.color);
  const currentSlide = dontChange ? textColor : currentSlideColor;
  return (
    <Button
      sx={{
        position: "relative",
        overflow: "hidden",
        color: currentSlide === "#ffffff" ? "#000" : "#fff",
        padding: "12px 20px",
        fontSize: "12px",
        width:'auto',
        maxWidth: width,
        minWidth: width,
        height: height,
        fontFamily: "Graphic",
        fontWeight: 400,
        backgroundColor: currentSlide === "#ffffff" ? textColor : "#000",
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
          backgroundColor: currentSlide === "#ffffff" ? "#000" : textColor,
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
              : textColor,
        },
        "& span": {
          position: "relative",
          zIndex: 2,
          transition: "color 0.1s ease-in-out",
        },
        "&:hover span": {
          color:
            isMobile && currentSlide === "#ffffff"
              ? textColor
              : currentSlide === "#ffffff"
              ? textColor
              : "#000",
        },
      }}
      onClick={func}
    >
      <span>{text}</span>
      {showIcon && (
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
                  ? textColor
                  : currentSlide === "#000000"
                  ? "#000"
                  : textColor,
            },
          }}
        />
      )}
    </Button>
  );
};
