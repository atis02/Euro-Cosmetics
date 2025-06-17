import { Skeleton, Stack } from "@mui/material";
import { FC } from "react";
import { CustomBreadcrumb } from "../../../Components/utils/CustomBreadCrumb";
import CustomProductText from "../../../Components/utils/CustomProductText";
import {
  Category,
  Segment,
  Subcategory,
} from "../../../Components/Navbar/ui/NavCategories/interfaces";

interface Name {
  title: string;
}

type Props = {
  isMobile: boolean;
  isTablet: boolean;
  category?: Category;
  subCategory?: Subcategory;
  segment?: Segment;
  loading?: boolean;
  text?: string;
};

const BannerImageText: FC<Props> = ({
  isMobile,
  isTablet,
  category,
  subCategory,
  segment,
  loading = false,
  text,
}) => {
  const subCategoryName: Name | undefined = subCategory
    ? { title: subCategory.nameRu }
    : undefined;
  const segmentName: Name | undefined = segment
    ? { title: segment.nameRu }
    : undefined;

  return (
    <>
      <Stack position="absolute" top={isMobile ? "13%" : "50%"} zIndex={100}>
        {loading ? (
          <Stack spacing={2} direction="row" sx={{ width: "205px" }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width="100%"
                height={22}
                sx={{ my: 0.5, borderRadius: 1 }}
              />
            ))}
          </Stack>
        ) : (
          category &&
          (!subCategoryName || subCategory) &&
          (!segmentName || segment) && (
            <CustomBreadcrumb
              color="#fff"
              category={{ title: category.nameRu }}
              subCategory={
                subCategory ? { title: subCategory.nameRu } : undefined
              }
              segment={segment ? { title: segment.nameRu } : undefined}
            />
          )
        )}
      </Stack>
      <Stack
        position="absolute"
        top={isMobile ? "30%" : "45%"}
        zIndex={100}
        left={isMobile ? "3%" : "50%"}
      >
        <CustomProductText
          color="#fff"
          fw={500}
          text={
            text
              ? text
              : segmentName
              ? segmentName.title
              : subCategoryName
              ? subCategoryName.title
              : category?.nameRu
          }
          fz={isMobile ? 35 : isTablet ? 45 : 55}
        />
      </Stack>
    </>
  );
};

export default BannerImageText;
