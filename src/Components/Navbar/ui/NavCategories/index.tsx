import { Container } from "@mui/material";
import { data } from "../navs";
import { FC, useState } from "react";
import { NavSubCategories } from "./NavSubCategories";
import { NavSegments } from "./NavSegments";
import { NavCategories } from "./NavCategories";

interface Close {
  onClose: () => void;
}
const index: FC<Close> = ({ onClose }) => {
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [hoveredLinkSubCategory, setHoveredLinkSubCategory] = useState<
    number | null
  >(null);
  const [hoverSegment, setHoverSegment] = useState<number | null>(null);
  const [existSegments, setExistSegments] = useState<number | null>(null);
  return (
    <Container sx={{ display: "flex", position: "relative" }}>
      <NavCategories
        data={data}
        hoveredLink={hoveredLink}
        setHoveredLink={setHoveredLink}
        onClose={onClose}
      />

      <NavSubCategories
        data={data}
        hoveredLink={hoveredLink}
        existSegments={existSegments}
        hoveredLinkSubCategory={hoveredLinkSubCategory}
        setHoveredLinkSubCategory={setHoveredLinkSubCategory}
        setExistSegments={setExistSegments}
        onClose={onClose}
      />
      <NavSegments
        data={data}
        existSegments={existSegments}
        hoveredLink={hoveredLink}
        hoverSegment={hoverSegment}
        setHoverSegment={setHoverSegment}
        setExistSegments={setExistSegments}
        onClose={onClose}
      />
    </Container>
  );
};
export default index;
