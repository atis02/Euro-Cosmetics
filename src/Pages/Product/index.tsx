import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { CustomContainerAll } from "../../Components/utils/CustomContainerAll";
import { ProductImagesComponent } from "./components/ProductImagesComponent";
import { ProductDetails } from "./components/ProductDetails";
import { ProductTitleFeedBack } from "./components/ProductTitleFeedBack";
import { ProductBreadCrumbs } from "./components/ProductBreadCrumbs";
import { CustomButton } from "../../Components/utils/CustomButton";
import { mainColor } from "../../Components/utils/CustomStyles";
import FavoriteButton from "../../Components/utils/FavoriteButtonComponent";
import { useDispatch } from "react-redux";
import { addProduct } from "../../Components/redux/reducers/cartSlice";
import { OpenNotification } from "../../Components/utils/CustomToast";
import { MobileSwipeProducts } from "../../Components/utils/MobileSwipeProducts";
import ProductSwiper from "../../Components/utils/productsSwiper/ProductsSwiper";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { ProductDetailSkeleton } from "./components/ProductDetailSkeleton";
import { BASE_URL } from "../../Fetcher/swrConfig";
import TabComponent from "./components/TabComponent";

const index = () => {
  const product = JSON.parse(localStorage.getItem("productEuroCos") || "{}");
  const { id } = useParams();

  const { data, isLoading } = useSWR({
    url: `/products/barcode/${id}`,
  });

  const url = BASE_URL + "/products/client";
console.log(data);

  const fetchNewKey = JSON.stringify({
    url: url,
    body: { page: 1, limit: 10, categoryId: data?.Category?.id },
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    dispatch(addProduct(data));
    OpenNotification({
      image: data.imageOne,
      text: "добавлен в корзину!",
      icon: (
        <svg viewBox="0 0 21 21" style={{ width: 20, height: 20 }} fill="#fff">
          <path
            fillRule="evenodd"
            stroke="none"
            d="M7 6v-.5a3.5 3.5 0 1 1 7 0V6h3v13H4V6h3Zm1-.5a2.5 2.5 0 0 1 5 0V6H8v-.5ZM7 7v1.5h1V7h5v1.5h1V7h2v11H5V7h2Z"
            clip-rule="evenodd"
          ></path>
        </svg>
      ),
      title: data.nameRu,
    });
  };
  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  return (
    <>
      <CustomContainerAll>
        <Stack
          direction={{ lg: "row", md: "column", sm: "column", xs: "column" }}
          alignItems={{
            lg: "center",
            md: "center",
            sm: "center",
            xs: "column",
          }}
          gap={isMobile ? 2 : 0}
        >
          <Stack width={{ lg: "50%" }}>
            <ProductBreadCrumbs
              category={data?.Category}
              subCategory={data?.SubCategory}
              segment={data?.Segment}
            />
          </Stack>
          <ProductTitleFeedBack product={data} />
        </Stack>
        <Stack
          direction={{ lg: "row", md: "column", sm: "column", xs: "column" }}
          gap={isMobile ? 2 : 10}
          justifyContent="space-between"
        >
          <Stack maxWidth={{ lg: "65%", md: "65%", sm: "100%", xs: "100%" }}>
            <ProductImagesComponent product={data} isLoading={isLoading} />
          </Stack>
          <Stack width="35%" mt={isMobile ? 0 : 10}>
            <ProductDetails product={data} />
          </Stack>
        </Stack>

        <Stack
          direction="row"
          m={isMobile ? 0 : 2}
          gap={2}
          width="100%"
          alignItems="end"
          justifyContent='flex-end'
        >
          <TabComponent product={data} />
        </Stack>
        {isMobile && (
          <Stack
            direction="row"
            bgcolor="#fff"
            height={60}
            position="sticky"
            bottom={0}
            pb={1}
            mt={2}
            gap={1}
            border="none"
            boxShadow="none"
          >
            <CustomButton
              height="100%"
              text="Добавить в корзину"
              textColor={mainColor}
              width={300}
              func={handleToggle}
            />
            <FavoriteButton
              bgcolor="#000"
              height={50}
              width={50}
              product={product}
              br={0}
              color="#fff"
            />
          </Stack>
        )}
      </CustomContainerAll>
      {isMobile ? (
        <Stack>
          <MobileSwipeProducts
            products={categoryProduct}
            isLoading={loadingCategoryProduct}
            text="похожие товары"
            isMobile
            p={1}
            width="100vw"
            isProductDetail
          />
        </Stack>
      ) : (
        <ProductSwiper
          data={categoryProduct}
          error={categoryProductError}
          isLoading={loadingCategoryProduct}
          text="похожие товары"
        />
      )}
    </>
  );
};
export default index;
