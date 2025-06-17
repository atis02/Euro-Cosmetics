import {
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { mainColor } from "../../Components/utils/CustomStyles";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../Product/components/interfaces";
import Search from "../../Components/Search";
import { setOpenCart } from "../../Components/redux/reducers/swiperSlice";
import CustomDrawer from "../../Components/utils/CustomDrawer";
import { Close } from "@mui/icons-material";
import { clearCart } from "../../Components/redux/reducers/cartSlice";
import { Divider } from "antd";
import { EmptyCart } from "./components/EmptyCart";
import { PopularProductsMini } from "../../Components/utils/PopularProductsMini";
import { CustomProductCart } from "./components/CustomProductCart";
import { MobileSwipeProducts } from "../../Components/utils/MobileSwipeProducts";
import { BASE_URL } from "../../Fetcher/swrConfig";
import useSWR from "swr";
import { DeliveryDetails } from "./components/DeliveryDetails/DeliveryDetails";

const CartDrawer: FC = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const drawerOpen = useSelector((state: any) => state.swiper.openCart);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleClearCart = () => dispatch(clearCart());
  const handleCloseDrawer = () => dispatch(setOpenCart(false));

  const url = BASE_URL + "/products/client";

  const fetchNewKey = JSON.stringify({
    url: url,
    body: { page: 1, limit: 10, categoryId: cartItems[0]?.product.categoryId },
    method: "POST",
  });

  const fetcher = (key: string) => {
    const { url, body, method } = JSON.parse(key);
    return fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  };
  const {
    data: categoryProduct,
    error: categoryProductError,
    isLoading: loadingCategoryProduct,
  } = useSWR(fetchNewKey, fetcher);

  return (
    <CustomDrawer open={drawerOpen} width="50vw" onClose={handleCloseDrawer}>
      {cartItems.length > 0 && (
        <Stack
          direction="row"
          mb={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            color="#000"
            fontSize={{ lg: 25, md: 25, sm: 23, xs: 20 }}
            sx={{
              "&:hover": { color: mainColor },
              cursor: "pointer",
              fontFamily: "Graphic",
              fontWeight: 500,
            }}
          >
            корзина / {cartItems.length} шт.
          </Typography>

          <Stack direction="row" gap={1} alignItems="center">
            <IconButton onClick={handleClearCart}>
              <svg
                stroke="none"
                viewBox="0 0 24 24"
                fill="#000"
                style={{ width: 25, height: 25 }}
              >
                <path d="M5.6 21.6h-.75v.75h.75v-.75Zm12.8 0v.75h.75v-.75h-.75ZM8.8 2.4v-.75a.75.75 0 0 0-.75.75h.75Zm6.4 0h.75a.75.75 0 0 0-.75-.75v.75ZM4.85 5.6v16h1.5v-16h-1.5Zm.75 16.75h12.8v-1.5H5.6v1.5Zm13.55-.75v-16h-1.5v16h1.5Zm-9.6-16V2.4h-1.5v3.2h1.5ZM8.8 3.15h6.4v-1.5H8.8v1.5Zm5.65-.75v3.2h1.5V2.4h-1.5Zm6.35 2.45H3.2v1.5h17.6v-1.5Z" />
                <path stroke="#000" strokeWidth="1.5" d="M12 9.598v7.8" />
                <path stroke="#000" strokeWidth="1.5" d="M15 9.598v7.8" />
                <path stroke="#000" strokeWidth="1.5" d="M9 9.598v7.8" />
              </svg>
            </IconButton>

            <Divider
              type="vertical"
              style={{ height: 30, backgroundColor: "lightgray" }}
            />

            <IconButton onClick={handleCloseDrawer} sx={{ color: "#000" }}>
              <Close />
            </IconButton>
          </Stack>
        </Stack>
      )}

      <Stack
        direction="column"
        width="100%"
        gap={{ lg: 6, md: 5, sm: 4, xs: 3 }}
      >
        {cartItems.length ? (
          <>
            {cartItems.map((item: Product, idx: number) => (
              <Stack key={idx} gap={3} width="100%">
                <CustomProductCart product={item.product} />
              </Stack>
            ))}
            <DeliveryDetails />
          </>
        ) : (
          <EmptyCart />
        )}

        {!!cartItems.length &&
          (isMobile ? (
            <Stack>
              <MobileSwipeProducts
                products={categoryProduct}
                isLoading={loadingCategoryProduct}
                text="вам может понравиться"
                isCart
              />
            </Stack>
          ) : (
            <PopularProductsMini
              visibleCount={3}
              data={categoryProduct}
              error={categoryProductError}
              isLoading={loadingCategoryProduct}
              text="вам может понравиться"
            />
          ))}
      </Stack>

      <Search isMobile={isMobile} />
    </CustomDrawer>
  );
};

export default CartDrawer;
