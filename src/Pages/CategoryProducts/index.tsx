import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
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
  Status,
  Subcategory,
} from "../../Components/Navbar/ui/NavCategories/interfaces";
import { BASE_URL } from "../../Fetcher/swrConfig";
import { SearchFieldResultText } from "./components/SearchField";
import {
  getBrands,
  getCategories,
  getGiftCards,
  getSegments,
  getStatuses,
  getSubCategories,
} from "./components/hooks";
import { useTranslation } from "react-i18next";
import { CategoryLoader } from "./CategoryLoader";

interface Props {
  products: any[];
}
const Index = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [products, setProducts] = useState<Props>();
  const [category, setCategory] = useState<Category>();
  const [subCategory, setSubCategory] = useState<Subcategory | null>(null);
  const [segment, setSegment] = useState<Segment | null>(null);
  const [subCategoryList, setSubCategoryList] = useState<
    Subcategory[] | Segment[] | null
  >(null);
  const { t } = useTranslation();
  const {
    categoryName,
    subCategoryName,
    segmentName,
    statusName,
    searchedValue,
    brandId,
  } = useParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const fetchProducts = async (params: {
    categoryId?: number | null;
    subCategoryId?: number | null;
    segmentId?: number | null;
    productStatusId?: number | null;
    query?: string | null;
    brandId?: string | null | undefined;
    hasDiscount?: boolean | null;
    limit?: number | null;
    page?: number | null;
    discount?: boolean | null;
  }) => {
    try {
      const res = await axios.post(`${BASE_URL}/products/client`, params);
      if (params.discount == true) {
        const filtered = res.data?.products.filter(
          (item: any) => item.discountValue >= 50
        );
        setProducts({ products: filtered });
      } else {
        setProducts(res.data);
      }
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
    }
  };

  useEffect(() => {
    setCategory(undefined);
    setSubCategory(null);
    setSegment(null);
    setStatus(null);
  }, [categoryName, subCategoryName, segmentName]);

  useEffect(() => {
    const fetchSubCategoryList = async () => {
      if (category?.SubCategories?.length && !subCategoryName && !segmentName) {
        setSubCategoryList(category.SubCategories);
      } else if (subCategory?.id && !segmentName && !loading) {
        try {
          const res = await axios.get(
            `${BASE_URL}/subcategories/fetch/single/${subCategory.id}`
          );
          setSubCategoryList(res.data?.Segments || []);
        } catch (err) {
          console.error("Ошибка при загрузке сегментов:", err);
        }
      } else {
        setSubCategoryList(null);
      }
    };

    fetchSubCategoryList();
  }, [category, subCategory, subCategoryName, segmentName, loading]);

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        setLoading(true);

        if (statusName === "gift") {
          const res = await getGiftCards();
          return setProducts({ products: res });
        }
        if (brandId) {
          const brands = await getBrands();
          const foundBrand =
            brands.length && brands.find((brand) => brand.name === brandId);
          if (foundBrand) {
            return await fetchProducts({ brandId: foundBrand.id });
          }
        }
        if (statusName === "50") {
          return await fetchProducts({
            limit: 20,
            hasDiscount: true,
            discount: true,
          });
        }
        if (statusName === "100") {
          return await fetchProducts({
            limit: 20,
            hasDiscount: true,
          });
        }
        if (statusName) {
          const statuses = await getStatuses();
          const foundStatus = statuses.find(
            (status: Status) => status.id === Number(statusName)
          );
          setStatus(foundStatus ?? null);
          if (foundStatus) {
            return await fetchProducts({
              productStatusId: Number(foundStatus.id),
            });
          }
        }
        if (searchedValue) {
          return await fetchProducts({ query: searchedValue });
        }

        // Категории
        const categories = await getCategories();
        const foundCategory = categories.find(
          (cat) => cat.nameRu === categoryName
        );
        if (!foundCategory) return;

        setCategory(foundCategory);

        // Подкатегория
        let subCatId: number | null = null;
        if (subCategoryName) {
          const subCategories = await getSubCategories();
          const foundSub = subCategories.find(
            (s) =>
              s.nameRu === subCategoryName &&
              String(s.categoryId) === String(foundCategory.id)
          );
          if (!foundSub) return;

          subCatId = Number(foundSub.id);
          setSubCategory(foundSub);
        }

        // Сегмент
        let segId: number | null = null;
        if (segmentName) {
          const segments = await getSegments();
          const foundSegment = segments.find(
            (s) =>
              s.nameRu === segmentName &&
              (!subCatId || s.SubCategory?.nameRu === subCategoryName)
          );
          if (foundSegment) {
            segId = Number(foundSegment.id);
            setSegment(foundSegment);
          }
        }

        // Получаем продукты
        await fetchProducts({
          categoryId: foundCategory.id,
          subCategoryId: subCatId,
          segmentId: segId,
          productStatusId: statusName ? Number(statusName) : null,
          brandId: brandId,
        });
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName || statusName || searchedValue || brandId) {
      fetchAndFilter();
    }
  }, [
    categoryName,
    subCategoryName,
    segmentName,
    statusName,
    searchedValue,
    brandId,
  ]);

  // Loader
  if (loading) {
    return <CategoryLoader isMobile={isMobile} />;
  }

  return (
    <>
      <CustomContainerAll>
        {statusName === "gift" ||
        brandId ||
        statusName == "100" ||
        statusName === "50" ? (
          <SearchFieldResultText
            disabled
            searchedValue={
              statusName === "50"
                ? t("navbar.aksiya50")
                : statusName === "gift"
                ? t("navbar.giftCard")
                : statusName == "100"
                ? "акции"
                : brandId ?? ""
            }
            isMobile={isMobile}
          />
        ) : searchedValue ? (
          <SearchFieldResultText
            searchedValue={searchedValue}
            isMobile={isMobile}
          />
        ) : (
          <Stack sx={{ height: isMobile ? "32vh" : "50vh" }}>
            <BannerImage
              image={status ? status.image : category?.coverImage ?? ""}
              isMobile={isMobile}
            />
            <BannerImageText
              loading={loading}
              isMobile={isMobile}
              isTablet={isTablet}
              category={category}
              subCategory={subCategory ?? undefined}
              segment={segment ?? undefined}
              text={status?.nameRu}
            />
          </Stack>
        )}
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
            end={products?.products?.length ?? 0}
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

      {!products?.products?.length ? (
        <Stack minHeight="50vh" alignItems="center" justifyContent="center">
          <Typography fontFamily="Graphic" fontSize={20}>
            товар не найден
          </Typography>
        </Stack>
      ) : isMobile ? (
        <MobileProducts product={products?.products ?? []} />
      ) : (
        <Products product={products?.products ?? []} />
      )}
    </>
  );
};

export default Index;
