import { Container } from "@mui/material";
import { FC, useState } from "react";
import { NavSubCategories } from "./NavSubCategories";
import { NavSegments } from "./NavSegments";
import { NavCategories } from "./NavCategories";
import useSWR from "swr";
import LoadingSkeleton from "./LoadingSkeleton";

interface Close {
  onClose: () => void;
}
const index: FC<Close> = ({ onClose }) => {
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [hoveredLinkSubCategory, setHoveredLinkSubCategory] = useState<
    number | null
  >(null);
  // const [hoverSegment, setHoverSegment] = useState<number | null>(null);
  const [existSegments, setExistSegments] = useState<string | null>(null);
  const { data, error, isLoading } = useSWR({
    url: "/categories/fetch/client",
  });
  const categoryLink =
    data && data.categories.filter((item: any) => item.id === hoveredLink);
  console.log(categoryLink);

  const activeSubCategory = data?.categories
    .find((item: any) =>
      item.SubCategories?.some((sub: any) => sub.id === existSegments)
    )
    ?.SubCategories?.find((sub: any) => sub.id === existSegments);

  const subCategoryTitle = activeSubCategory?.nameRu || "";

  if (error) {
    return;
  }
  if (isLoading) {
    return (
      <Container sx={{ display: "flex", position: "relative" }}>
        <LoadingSkeleton />
      </Container>
    );
  }
  return (
    <Container sx={{ display: "flex", position: "relative" }}>
      <NavCategories
        data={data?.categories}
        hoveredLink={hoveredLink}
        setHoveredLink={setHoveredLink}
        onClose={onClose}
      />

      <NavSubCategories
        data={data?.categories}
        hoveredLink={hoveredLink}
        existSegments={existSegments}
        hoveredLinkSubCategory={hoveredLinkSubCategory}
        setHoveredLinkSubCategory={setHoveredLinkSubCategory}
        setExistSegments={setExistSegments}
        onClose={onClose}
      />
      <NavSegments
        data={data?.categories}
        existSegments={existSegments}
        categoryTitle={categoryLink && categoryLink[0]?.nameRu}
        subCategoryTitle={subCategoryTitle}
        onClose={onClose}
      />
    </Container>
  );
};
export default index;
