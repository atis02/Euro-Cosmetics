import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { CustomContainerAll } from "../../Components/utils/CustomContainerAll";
import BannerImage from "./components/BannerImage";
import BannerImageText from "./components/BannerImageText";
import SubCategories from "./components/SubCategories";
import Products from "./components/Products/Products";
import SortProducts from "./components/Products/components/SortProducts";
import CustomFilterButton from "../../Components/utils/CustomFilterButton";
import CountUp from "react-countup";
import MobileProducts from "./components/Products/MobileProducts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Category,
  Segment,
  Subcategory,
} from "../../Components/Navbar/ui/NavCategories/interfaces";
import { BASE_URL } from "../../Fetcher/swrConfig";

interface Props {
  products: [];
}
const Index = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Props>();
  const [category, setCategory] = useState<Category>();
  const [subCategory, setSubCategory] = useState<Subcategory | null>(null);
  const [segment, setSegment] = useState<Segment | null>(null);
  const [subCategoryList, setSubCategoryList] = useState<
    Subcategory[] | Segment[] | null
  >(null);

  const { categoryName, subCategoryName, segmentName } = useParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    setCategory(undefined);
    setSubCategory(null);
    setSegment(null);
  }, [categoryName, subCategoryName, segmentName]);

  useEffect(() => {
    const fetchSubCategoryList = async () => {
      if (category?.SubCategories?.length && !subCategoryName && !segmentName) {
        setSubCategoryList(category.SubCategories);
      } else if (segmentName == undefined && subCategory?.id && !loading) {
        try {
          const res = await axios.get(
            `${BASE_URL}/subcategories/fetch/single/${subCategory.id}`
          );
          setSubCategoryList(res.data?.Segments || []);
        } catch (err) {
          console.error("Ошибка при загрузке сегментов:", err);
        }
      } else if (
        category?.SubCategories?.length &&
        !subCategoryName &&
        !segmentName
      ) {
        return setSubCategoryList(category.SubCategories);
      } else {
        setSubCategoryList(null);
      }
    };

    fetchSubCategoryList();
  }, [category, subCategory, subCategoryName, segmentName, loading]);

  const fetchProducts = async ({
    categoryId,
    subCategoryId,
    segmentId,
  }: {
    categoryId: number | null;
    subCategoryId: number | null;
    segmentId: number | null;
  }) => {
    try {
      const res = await axios.post(`${BASE_URL}/products/client`, {
        categoryId,
        subCategoryId,
        segmentId,
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
    }
  };

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        setLoading(true);

        // Категория
        const categoriesRes = await axios.get(
          `${BASE_URL}/categories/fetch/client`
        );
        const foundCategory = categoriesRes.data.categories?.find(
          (cat: Category) => cat.nameRu === categoryName
        );
        if (!foundCategory) return;
        setCategory(foundCategory);

        // Подкатегория
        let subCatId = null;
        if (subCategoryName) {
          const subRes = await axios.get(
            `${BASE_URL}/subcategories/fetch/client`
          );
          const foundSub = subRes.data.subCategories?.find(
            (s: Subcategory) =>
              s.nameRu === subCategoryName && s.categoryId === foundCategory.id
          );
          if (!foundSub) return;
          subCatId = foundSub.id;
          setSubCategory(foundSub);
        }

        // Сегмент
        let segId = null;
        if (segmentName) {
          const segRes = await axios.get(`${BASE_URL}/segments/fetch/client`);
          const foundSegment = segRes.data.segments?.find(
            (s: Segment) =>
              s.nameRu === segmentName &&
              (!subCatId || s.SubCategory?.nameRu === subCategoryName)
          );
          if (foundSegment) {
            segId = foundSegment.id;
            setSegment(foundSegment);
          }
        }

        // Продукты
        await fetchProducts({
          categoryId: foundCategory.id,
          subCategoryId: subCatId,
          segmentId: segId,
        });
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchAndFilter();
    }
  }, [categoryName, subCategoryName, segmentName]);

  return (
    <>
      <CustomContainerAll>
        <Stack sx={{ height: isMobile ? "32vh" : "50vh" }}>
          <BannerImage image={category?.image ?? ""} isMobile={isMobile} />
          <BannerImageText
            loading={loading}
            isMobile={isMobile}
            isTablet={isTablet}
            category={category}
            subCategory={subCategory ?? undefined}
            segment={segment ?? undefined}
          />
        </Stack>
      </CustomContainerAll>

      {subCategoryList && <SubCategories subCategories={subCategoryList} />}

      <Stack
        sx={{ padding: isMobile ? "10px 20px" : "15px 40px 0 40px" }}
        direction="row"
        alignItems="center"
        spacing={3}
      >
        <CustomFilterButton isMobile />
        {!isMobile && <SortProducts />}
        <Stack alignItems="center" width={isMobile ? "55%" : "auto"}>
          <CountUp
            end={products?.products.length ?? 0}
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

      {isMobile ? (
        <MobileProducts />
      ) : (
        <Products product={products?.products ?? []} />
      )}
    </>
  );
};

export default Index;
