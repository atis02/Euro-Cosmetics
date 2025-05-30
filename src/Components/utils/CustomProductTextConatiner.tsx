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
import { hoverStyle, mainColor } from "./CustomStyles";
import { removeProduct } from "../redux/reducers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../Pages/Product/components/interfaces";
import { toggleFavorite } from "../redux/reducers/favoriteSlice";
import { OpenNotification } from "./CustomToast";
import CountUp from "react-countup";
type Props = {
  textCategory: string | undefined;
  mainText: string;
  discountPrice: number | undefined;
  sellPrice: number | undefined;
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
  justifyContCart?: boolean;
  dr?: "row";
  isCart?: boolean;
  showAddMinus?: boolean;
  article?: string;
  quantity?: number;
};
const CustomProductTextConatiner: FC<Props> = ({
  textCategory,
  mainText,
  discountPrice,
  sellPrice,
  ta,
  fz = 20,
  jc = "flex-end",
  justifyContCart = false,
  dr,
  isCart,
  showAddMinus,
  article,
  quantity,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.items);

  const cartItems = useSelector((state: any) => state.cart.items);
  console.log(sellPrice);

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
    <Stack
      direction={dr}
      height="100%"
      sx={{ ...(justifyContCart ? "" : hoverStyle) }}
      justifyContent="space-between"
      gap={1}
    >
      {!isMobile ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={justifyContCart ? "space-between" : jc}
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
          {isMobile && isCart && (
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
            <CountUp
              end={discountPrice ? discountPrice * (quantity ?? 1) : 0}
              duration={0.6}
              prefix="скидка $ "
              separator=" "
              style={{
                color: mainColor,
                fontWeight: 500,
                fontFamily: "Graphic",
              }}
            />
          </Stack>
        )}
        <Stack direction="row" gap={2} justifyContent={jc}>
          {sellPrice && (
            <CountUp
              end={sellPrice ? sellPrice * (quantity ?? 1) : 0}
              duration={0.6}
              separator=" "
              prefix="$ "
              style={{
                fontWeight: 500,
                fontFamily: "Graphic",
              }}
            />
          )}
          {discountPrice != sellPrice && discountPrice && (
            <CountUp
              end={discountPrice * (quantity ?? 1)}
              duration={0.6}
              separator=" "
              prefix="$ "
              style={{
                color: "#b3b3b3",
                fontWeight: 500,
                fontFamily: "Graphic",
                textDecoration: "line-through",
              }}
            />
          )}
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
