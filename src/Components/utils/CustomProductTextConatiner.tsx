import { FC, useState } from "react";
import {
  Divider,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorderOutlined,
  MoreVert,
} from "@mui/icons-material";
import { Sheet } from "react-modal-sheet";
import CustomProductText from "./CustomProductText";
import { AddMinusBtns } from "./AddMinusBtns";
import { mainColor } from "./CustomStyles";
import { removeProduct } from "../redux/reducers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../Pages/Product/components/interfaces";
import { toggleFavorite } from "../redux/reducers/favoriteSlice";
import { OpenNotification } from "./CustomToast";
type Props = {
  textCategory: string;
  mainText: string;
  discountPrice: number;
  sellPrice: number;
  ta?:
    | "left"
    | "right"
    | "center"
    | "justify"
    | "inherit"
    | "initial"
    | "unset";
  fz?: number;
  jc?: "flex-end" | "center" | "start" | "space-between";
  dr?: "row";
  isCart?: boolean;
  showAddMinus?: boolean;
  article?: string;
};
const CustomProductTextConatiner: FC<Props> = ({
  textCategory,
  mainText,
  discountPrice,
  sellPrice,
  ta,
  fz = 20,
  jc = "flex-end",
  dr,
  isCart,
  showAddMinus,
  article,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.items);

  const cartItems = useSelector((state: any) => state.cart.items);

  const isFavorite: boolean = favorites.some(
    (item: Product) => item.product?.articule === article
  );

  const handleToggle = (
    e: React.MouseEvent<HTMLButtonElement>,
    article: string
  ): void => {
    const filteredItems = cartItems.filter(
      (item: Product) => item.product.articule == article
    );

    e.stopPropagation();
    dispatch(toggleFavorite(filteredItems[0]));
    !isFavorite
      ? OpenNotification({
          image: filteredItems[0]?.product.image,
          text: "добавлен в избранное!",
          icon: <FavoriteBorderOutlined />,
          title: filteredItems[0]?.product.title,
        })
      : "";
  };
  const handleOpenSheet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    article: string
  ): void => {
    e.stopPropagation();
    dispatch(removeProduct(article));
  };

  return (
    <Stack direction={dr} height="100%" justifyContent="space-between" gap={1}>
      {!isMobile ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <CustomProductText text={textCategory} />
          {showAddMinus && (
            <Stack mt={-3} height={15}>
              <AddMinusBtns article={article} />
            </Stack>
          )}
        </Stack>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <CustomProductText text={textCategory} />
          {isMobile && (
            <IconButton onClick={handleOpenSheet}>
              <MoreVert />
            </IconButton>
          )}
        </Stack>
      )}

      {/* PRICE BLOCK */}
      <CustomProductText fz={fz} fw={500} mainText={mainText} ta={ta} />
      <Stack direction="column">
        {isCart && (
          <Stack direction="row" gap={2} mb={0.5} justifyContent={jc}>
            <CustomProductText
              fz={12}
              fw={500}
              color={mainColor}
              discountPrice={`скидка ${sellPrice - discountPrice}`}
            />
          </Stack>
        )}
        <Stack direction="row" gap={2} justifyContent={jc}>
          <CustomProductText fz={fz} fw={500} discountPrice={sellPrice} />
          <CustomProductText
            fz={fz}
            fw={500}
            lineThrough
            discounted
            discountPrice={sellPrice + discountPrice}
          />
        </Stack>
      </Stack>

      <Sheet isOpen={open} onClose={() => setOpen(false)}>
        <Sheet.Container
          style={{
            height: "30vh",
            maxWidth: "100vw",
            margin: "0 auto",
            borderTopLeftRadius: "35px",
            borderTopRightRadius: "35px",
          }}
        >
          <Sheet.Header />
          <Sheet.Content>
            <Stack direction="row" p={2} spacing={2}>
              <CustomProductText
                width="50%"
                text="изменить количество"
                fw={500}
                fz={20}
              />
              {article && <AddMinusBtns showDeleteIcon article={article} />}
            </Stack>
            <Divider />
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              mt={1}
            >
              <IconButton
                sx={{ color: "#000", fontFamily: "Graphic", fontSize: 20 }}
                onClick={(e) => handleDelete(e, article ?? "")}
              >
                Удалить
              </IconButton>
              <IconButton
                sx={{
                  color: "#000",
                  fontSize: 20,
                  gap: 1,
                  fontFamily: "Graphic",
                }}
                onClick={(e) => handleToggle(e, article ?? "")}
              >
                {isFavorite ? (
                  <Favorite
                    sx={{
                      "&:hover": { color: mainColor },
                      color: "#000",
                    }}
                  />
                ) : (
                  <FavoriteBorderOutlined sx={{ color: "#000" }} />
                )}
                в избранное
              </IconButton>
            </Stack>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => setOpen(false)} />
      </Sheet>
    </Stack>
  );
};

export default CustomProductTextConatiner;
