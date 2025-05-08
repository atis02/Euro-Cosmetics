import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Category } from "./interfaces";
import { motion } from "framer-motion";

interface HoverStateProps {
  hoveredLink: number | null;
  existSegments: number | null;
  hoveredLinkSubCategory: number | null;
  data: Category[];
}

interface SetStateProps {
  setHoveredLinkSubCategory: (index: number | null) => void;
  setExistSegments: (index: number | null) => void;
  onClose: () => void;
}

type Props = HoverStateProps & SetStateProps;

export const NavSubCategories: FC<Props> = ({
  hoveredLink,
  existSegments,
  hoveredLinkSubCategory,
  data,
  setHoveredLinkSubCategory,
  setExistSegments,
  onClose,
}) => {
  return (
    hoveredLink !== null && (
      <motion.div
        key={`subcategories-${hoveredLink}`}
        initial={{ opacity: 0, x: hoveredLink > 0 ? -50 : 90 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: hoveredLink > 0 ? -50 : 90 }}
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
          {data
            .find((item) => item.id === hoveredLink)
            ?.subcategories?.map((sub, index) => (
              <Grid2 key={sub.title} sx={{ height: 32 }}>
                <NavLink
                  to={`/${hoveredLink}/${sub.title}`}
                  style={{
                    textDecoration: "none",
                    color:
                      existSegments === index
                        ? "#000"
                        : hoveredLinkSubCategory === index
                        ? "#000"
                        : "gray",
                    fontSize: "13px",
                    fontWeight: "normal",
                    alignItems: "center",
                    justifyContent: "space-between",
                    display: "flex",
                    width: "205px",
                  }}
                  onClick={onClose}
                  onMouseEnter={() => {
                    setHoveredLinkSubCategory(index);
                    setExistSegments(sub.segments?.length ? index : null);
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Graphic",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {sub.title}
                  </Typography>
                  {sub.segments?.length && (
                    <KeyboardArrowRight sx={{ width: 17, height: 17 }} />
                  )}
                </NavLink>
              </Grid2>
            ))}
        </Grid2>
      </motion.div>
    )
  );
};
