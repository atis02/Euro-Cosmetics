import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { CustomContainerAll } from "../../Components/utils/CustomContainerAll";
import BannerImage from "./components/BannerImage";
import BannerImageText from "./components/BannerImageText";
import SubCategories from "./components/SubCategories";
import Products from "./components/Products/Products";
import SortProducts from "./components/Products/components/SortProducts";
import CustomFilterButton from "../../Components/utils/CustomFilterButton";
import CountUp from "react-countup";
import { images } from "../../Components/utils/productsSwiper/constants";
import MobileProducts from "./components/Products/MobileProducts";

const index = () => {
  // const [searchParams, setSearchParams] = useSearchParams();

  // const category = searchParams.get('category');
  // const subcategory = searchParams.get('subcategory');
  // const segment = searchParams.get('segment');

  // useEffect(() => {
  //   fetchProducts({ category, subcategory, segment });
  // }, [category, subcategory, segment]);
  const category = JSON.parse(
    localStorage.getItem("categoryImageEuroCos") || "{}"
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      <CustomContainerAll>
        {/* {scrolled && <Box sx={{ height: isMobile ? "68.8px" : "80px" }} />} */}
        <Stack
          sx={{
            height: isMobile ? "32vh" : "50vh",
          }}
        >
          <BannerImage image={category.image} isMobile={isMobile} />
          <BannerImageText
            isMobile={isMobile}
            isTablet={isTablet}
            category={category}
          />
        </Stack>
      </CustomContainerAll>
      <SubCategories subCategories={category.subcategories} />
      <Stack
        sx={{
          padding: isMobile ? "10px 20px" : "15px 40px 0 40px",
        }}
        direction="row"
        alignItems="center"
        spacing={3}
        // justifyContent="space-between"
      >
        <CustomFilterButton isMobile />
        {!isMobile && <SortProducts />}
        <Stack alignItems="center" width={isMobile ? "55%" : "auto"}>
          <CountUp
            end={images.length}
            duration={0.6}
            suffix=" продукта"
            separator=" "
            style={{
              fontSize: isMobile ? 16 : 20,
              fontWeight: 400,
              fontFamily: "Graphic",
            }}
          />
        </Stack>
      </Stack>
      {isMobile ? <MobileProducts /> : <Products />}
    </>
  );
};

export default index;
