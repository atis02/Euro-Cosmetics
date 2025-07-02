import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CustomContainerAll } from "../../Components/utils/CustomContainerAll";
import BannerImage from "./components/CategoryBanner/BannerImage";
import BannerImageText from "./components/CategoryBanner/BannerImageText";
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
  Status,
  Subcategory,
} from "../../Components/Navbar/ui/NavCategories/interfaces";
import { BASE_URL } from "../../Fetcher/swrConfig";
import { SearchFieldResultText } from "./components/SearchField";
import {
  getBrands,
  getCategories,
  getGiftCards,
  getStatuses,
  getSubCategories,
} from "./components/hooks";
import { useTranslation } from "react-i18next";
import { CategoryLoader } from "./CategoryLoader";
import DrawerFilters from "./components/DrawerFilter/DrawerFilters";

interface Props {
  products: any[];
}
const Index = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [products, setProducts] = useState<Props>();
  const [category, setCategory] = useState<Category>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [subCategory, setSubCategory] = useState<Subcategory | null>(null);
  const [subCategoryList, setSubCategoryList] = useState<Subcategory[] | null>(
    null
  );
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [getDiscount, setGetDiscount] = useState(false);
  const [selectedSort, setSelectedSort] = useState("currentSellPrice-asc");

  console.log(selectedSort.split('-'));
  
  const { t } = useTranslation();
  const { categoryName, subCategoryName, statusName, searchedValue, brandId } =
    useParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const fetchProducts = async (params: {
    categoryId?: number | null;
    subCategoryId?: number | null;
    productStatusId?: number | null;
    query?: string | null;
    brandId?: string | null | undefined;
    hasDiscount?: boolean | null;
    limit?: number | null;
    page?: number | null;
    discount?: boolean | null;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    order?: string;
  }) => {
    try {
      const res = await axios.post(`${BASE_URL}/products/client`, params);
      console.log(res.data);

      if (params.discount == true) {
        const filtered = res.data?.products.filter(
          (item: any) => item.discountValue >= 50
        );
        setProducts({ products: filtered });
      } else if (res.data.message == "Товары не были найдены.") {
        setProducts({ products: [] });
      } else {
        setProducts(res.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "Request failed with status code 404") {
          setProducts({ products: [] });
        }
      }
      console.error("Ошибка при загрузке продуктов:", error);
    }
  };

  useEffect(() => {
    setCategory(undefined);
    setSubCategory(null);
    setStatus(null);
  }, [categoryName, subCategoryName]);

  useEffect(() => {
    const fetchSubCategoryList = async () => {
      if (category?.SubCategories?.length && !subCategoryName) {
        setSubCategoryList(category.SubCategories);
      } else if (subCategory?.id && !loading) {
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
  }, [category, subCategory, subCategoryName, , loading]);

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

        // Получаем продукты
        await fetchProducts({
          categoryId: foundCategory.id,
          subCategoryId: subCatId,
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
  }, [categoryName, subCategoryName, statusName, searchedValue, brandId]);
  useEffect(() => {
    const runFilters = async () => {
      const [sortBy, order] = selectedSort.split("-");

      const filters: any = {
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      };
      filters.sortBy = sortBy
      filters.order = order
      if (getDiscount) {
        filters.hasDiscount = true;
      }

      // Add other filters as needed (like categoryId, etc.)
      if (category?.id) filters.categoryId = category.id;
      if (subCategory?.id) filters.subCategoryId = subCategory.id;

      await fetchProducts(filters);
    };

    runFilters();
  }, [priceRange, getDiscount, category, subCategory,selectedSort]);

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
        <CustomFilterButton isMobile func={() => setIsFilterDrawerOpen(true)} />
        <DrawerFilters
          isFilterDrawerOpen={isFilterDrawerOpen}
          setIsFilterDrawerOpen={setIsFilterDrawerOpen}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
          setGetDiscount={setGetDiscount}
          getDiscount={getDiscount}
          productsLength={products?.products?.length ?? 0}
        />
        {!isMobile && (
          <SortProducts
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        )}
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
