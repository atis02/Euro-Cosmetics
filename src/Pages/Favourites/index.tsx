import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { mainColor } from "../../Components/utils/CustomStyles";
import { CustomContainerAll } from "../../Components/utils/CustomContainerAll";
import { CustomProductCart } from "../../Components/utils/CustomProductCart";
import { useSelector } from "react-redux";
import { Product } from "../Product/components/interfaces";
import { PopularProductsMini } from "../../Components/utils/PopularProductsMini";

const index: FC = () => {
  const favorites = useSelector((state: any) => state.favorites.items);

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
        избранное
      </Typography>
      <Stack direction="row" gap={2}>
        {favorites.length ? (
          favorites.map((fav: Product) => (
            <CustomProductCart product={fav.product} />
          ))
        ) : (
          <Stack width="100%">
            <Typography>
              Нажмите на{" "}
              <svg viewBox="0 0 15 15" style={{ width: 15, height: 15 }}>
                <path
                  fill-rule="evenodd"
                  stroke="none"
                  d="m7.5 4.143-.723-.757c-.343-.359-1.142-1.002-2.072-1.267-.85-.243-1.814-.185-2.782.828C.946 3.969.873 5.02 1.118 5.959c.26.997.885 1.841 1.226 2.198L7.5 13.553l5.157-5.396c.34-.357.965-1.2 1.225-2.198.245-.938.172-1.99-.805-3.012-.968-1.013-1.932-1.071-2.783-.828-.93.265-1.728.908-2.071 1.267l-.723.757Zm.691 10.133L7.5 15l-.692-.724-5.187-5.428c-.84-.88-2.94-3.956-.421-6.592 2.282-2.387 4.907-.812 6.007.16.115.101.213.196.293.28.08-.084.177-.179.292-.28 1.1-.972 3.726-2.548 6.008-.16 2.52 2.637.42 5.713-.42 6.592l-5.19 5.428Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              , чтобы добавить продукт в избранное.
            </Typography>
            <PopularProductsMini text="популярные товары" />
          </Stack>
        )}
      </Stack>
    </CustomContainerAll>
  );
};
export default index;
