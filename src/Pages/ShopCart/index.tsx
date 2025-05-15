import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { mainColor } from "../../Components/utils/CustomStyles";
import { CustomContainerAll } from "../../Components/utils/CustomContainerAll";
import { CustomProductCart } from "../../Components/utils/CustomProductCart";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../Product/components/interfaces";
import { PopularProductsMini } from "../../Components/utils/PopularProductsMini";
import { useNavigate } from "react-router-dom";
import Search from "../../Components/Search";
import { setOpenSearch } from "../../Components/redux/reducers/swiperSlice";

const index: FC = () => {
  const favorites = useSelector((state: any) => state.favorites.items);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();

  return (
    <CustomContainerAll>
      <Typography
        color="#000"
        fontSize={{ lg: 50, md: 50, sm: 30, xs: 25 }}
        sx={{
          "&:hover": { color: mainColor },
          cursor: "pointer",
          fontFamily: "Graphic",
          fontWeight: 500,
        }}
      >
        в корзине ничего нет...
      </Typography>
      <Stack direction="row" gap={2}>
        {favorites.length ? (
          favorites.map((fav: Product) => (
            <CustomProductCart product={fav.product} />
          ))
        ) : (
          <Stack width="100%">
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
                onClick={() => dispatch(setOpenSearch(true))}
              >
                поиском
              </Button>
              , если ищете что-то конкретное
            </Typography>
            <PopularProductsMini text="популярные товары" />
          </Stack>
        )}
      </Stack>
      <Search isMobile={isMobile} />
    </CustomContainerAll>
  );
};
export default index;
