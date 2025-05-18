import {
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  mainColor,
  rowSpaceStyle,
} from "../../../Components/utils/CustomStyles";
import CustomProductText from "../../../Components/utils/CustomProductText";
import { useDispatch } from "react-redux";
import {
  setOpenCart,
  setOpenSearch,
} from "../../../Components/redux/reducers/swiperSlice";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PopularProductsMini } from "../../../Components/utils/PopularProductsMini";
import { MobileSwipeProducts } from "../../../Components/utils/MobileSwipeProducts";
import { images } from "../../../Components/utils/productsSwiper/constants";
import { CustomButtonSecond } from "../../../Components/utils/CustomButtonSecond";

export const EmptyCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openSearch = () => {
    dispatch(setOpenCart(false));
    dispatch(setOpenSearch(true));
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Stack width="100%" spacing={2}>
      <Stack sx={rowSpaceStyle} pt={isMobile ? 5 : 0}>
        <CustomProductText
          fz={isMobile ? 30 : 45}
          fw={500}
          width={isMobile ? "60%" : "60%"}
          lineHeight={1}
          text="в корзине ничего нет..."
        />
        <IconButton
          onClick={() => dispatch(setOpenCart(false))}
          sx={{
            position: isMobile ? "absolute" : "",
            top: 10,
            right: 10,
            color: "#000",
          }}
        >
          <Close sx={{ width: 30, height: 30 }} />
        </IconButton>
      </Stack>
      <Typography fontWeight={400} fontFamily={"Graphic"}>
        посмотрите наши{" "}
        <Button
          sx={{
            textTransform: "revert",
            fontFamily: "Graphic",
            fontWeight: 400,
            fontSize: 16,
            color: mainColor,
            p: 0,
            height: 18,
            borderRadius: 0,
            "&:hover": { borderBottom: `1px solid ${mainColor}` },
          }}
          onClick={() => navigate("/novinki")}
        >
          новинки
        </Button>{" "}
        или воспользуйтесь{" "}
        <Button
          sx={{
            textTransform: "revert",
            fontFamily: "Graphic",
            fontWeight: 400,
            fontSize: 16,
            color: mainColor,
            p: 0,
            height: 18,
            borderRadius: 0,
            "&:hover": { borderBottom: `1px solid ${mainColor}` },
          }}
          onClick={openSearch}
        >
          поиском
        </Button>
        , если ищете что-то конкретное
      </Typography>
      {isMobile ? (
        <>
          <MobileSwipeProducts text="популярные товары" products={images} />
          <CustomButtonSecond
            width="100%"
            textColor={mainColor}
            text="перейти к поиску продуктов"
            func={openSearch}
          />
        </>
      ) : (
        <>
          <PopularProductsMini visibleCount={3} text="популярные товары" />
          <CustomButtonSecond
            width="100%"
            textColor={mainColor}
            text="перейти к поиску продуктов"
            func={openSearch}
          />
        </>
      )}
    </Stack>
  );
};
