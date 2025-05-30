import { Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category, Segment } from "./interfaces";
import { motion, AnimatePresence } from "framer-motion";

interface HoverStateProps {
  existSegments: string | null;
  data: Category[];
  subCategoryTitle: string;
  categoryTitle: string;
}

interface SetStateProps {
  onClose: () => void;
}
type Props = HoverStateProps & SetStateProps;

export const NavSegments: FC<Props> = ({
  existSegments,
  data,
  onClose,
  categoryTitle,
  subCategoryTitle,
}) => {
  const [hoverSegment, setHoverSegment] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSegmentClick = (segment: Segment) => {
    // const data = {
    //   categoryId: category.id,
    //   subCategoryId: subcategoryId,
    // };
    // handleSelectCategory?.(data);
    // onCategorySelect(data);
    onClose();
    navigate(
      `/category/${categoryTitle}/${subCategoryTitle}/${segment.nameRu}`
    );
  };

  return (
    <AnimatePresence>
      {existSegments !== null && (
        <motion.div
          key={`segments-${existSegments}`}
          initial={{ opacity: 0, x: existSegments ? -60 : 90 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: existSegments ? -60 : 90 }}
          transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
          // onMouseLeave={() => setExistSegments(null)}
          style={{
            backgroundColor: "#fff",
            minHeight: 300,
            overflow: "auto",
            alignItems: "center",
            padding: "8px 10px 0 10px",
            zIndex: 10,
            position: "absolute",
            left: "410px",
            top: 0,
          }}
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
              ?.find((item) =>
                item.SubCategories?.some((sub) => sub.id === existSegments)
              )
              ?.SubCategories?.find((sub) => sub.id === existSegments)
              ?.Segments?.map((seg: Segment, index) => (
                <motion.div
                  key={seg.nameRu}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Grid2 sx={{ height: 32 }}>
                    <Stack
                      sx={{
                        color: hoverSegment === index ? "#000" : "gray",
                        fontSize: "13px",
                        fontWeight: "normal",
                        alignItems: "center",
                        display: "flex",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSegmentClick(seg)}
                      onMouseEnter={() => setHoverSegment(index)}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Graphic",
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        {seg.nameRu}
                      </Typography>
                    </Stack>
                  </Grid2>
                </motion.div>
              ))}
          </Grid2>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
