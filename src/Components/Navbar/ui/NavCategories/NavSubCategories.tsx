import { Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Category, Subcategory } from "./interfaces";
import { motion } from "framer-motion";

interface HoverStateProps {
  hoveredLink: number | null;
  hoveredLinkSubCategory: number | null;
  data: Category[];
}

interface SetStateProps {
  setHoveredLinkSubCategory: (index: number | null) => void;
  onClose: () => void;
}

type Props = HoverStateProps & SetStateProps;

export const NavSubCategories: FC<Props> = ({
  hoveredLink,
  hoveredLinkSubCategory,
  data,
  setHoveredLinkSubCategory,
  onClose,
}) => {
  const navigate = useNavigate();
  const handleSubcategoryClick = (
    category: Category,
    subCategory: Subcategory
  ) => {
    onClose();
    navigate(`/category/${category.nameRu}/${subCategory.nameRu}`);
  };
  return (
    hoveredLink !== null && (
      <motion.div
        key={`subcategories-${hoveredLink}`}
        initial={{
          opacity: 0,
          x: data.find((item) => item.id === hoveredLink) ? -50 : 90,
        }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: data.find((item) => item.id === hoveredLink) ? -50 : 90,
        }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: 0,
          left: "225px",
          backgroundColor: "#fff",
          minHeight: 300,
          overflow: "auto",
          padding: "8px 10px 0 10px",
          zIndex: 10,
        }}
        // onMouseLeave={() => setHoveredLink(null)}
      >
        <Grid2
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {data.length &&
            data
              .find((item) => item.id === hoveredLink)
              ?.SubCategories?.map((sub, index) => (
                <Grid2 key={sub.nameRu} sx={{ height: 32 }}>
                  <Stack
                    style={{
                      color:
                        hoveredLinkSubCategory === index
                          ? "#000"
                          : "gray",
                      fontSize: "13px",
                      fontWeight: "normal",
                      alignItems: "center",
                      justifyContent: "space-between",
                      minWidth: "405px",
                      cursor: "pointer",
                    }}
                    direction="row"
                    onClick={() =>
                      handleSubcategoryClick(
                        data.find((item) => item.id === hoveredLink)!,
                        sub
                      )
                    }
                    onMouseEnter={() => {
                      setHoveredLinkSubCategory(index);
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Graphic",
                        fontSize: 14,
                        fontWeight: 500,
                        textTransform: "lowercase",
                      }}
                    >
                      {sub.nameRu}
                    </Typography>
                  </Stack>
                </Grid2>
              ))}
        </Grid2>
      </motion.div>
    )
  );
};
