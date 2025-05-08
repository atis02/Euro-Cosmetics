import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Category } from "./interfaces";
import { motion, AnimatePresence } from "framer-motion";

interface HoverStateProps {
  hoveredLink: number | null;
  existSegments: number | null;
  hoverSegment: number | null;
  data: Category[];
}

interface SetStateProps {
  setHoverSegment: (index: number | null) => void;
  setExistSegments: (index: number | null) => void;
  onClose: () => void;
}
type Props = HoverStateProps & SetStateProps;

export const NavSegments: FC<Props> = ({
  existSegments,
  hoveredLink,
  hoverSegment,
  data,
  setHoverSegment,
  setExistSegments,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {existSegments !== null && (
        <motion.div
          key={`segments-${existSegments}`}
          initial={{ opacity: 0, x: existSegments > 0 ? -50 : 90 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: existSegments > 0 ? -50 : 90 }}
          transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
          onMouseLeave={() => setExistSegments(null)}
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
              .find((item) =>
                item.subcategories?.find((_, index) => index == existSegments)
              )
              ?.subcategories?.[existSegments!]?.segments?.map((seg, index) => (
                <motion.div
                  key={seg.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Grid2 sx={{ height: 32 }}>
                    <NavLink
                      to={`/${hoveredLink}/${seg.title}`}
                      style={{
                        textDecoration: "none",
                        color: hoverSegment === index ? "#000" : "gray",
                        fontSize: "13px",
                        fontWeight: "normal",
                        alignItems: "center",
                        display: "flex",
                      }}
                      onClick={onClose}
                      onMouseEnter={() => setHoverSegment(index)}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Graphic",
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        {seg.title}
                      </Typography>
                    </NavLink>
                  </Grid2>
                </motion.div>
              ))}
          </Grid2>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
