import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Category } from "./interfaces";
import { useNavigate } from "react-router-dom";
import { KeyboardArrowRight } from "@mui/icons-material";

interface HoverStateProps {
  hoveredLink: number | null;
  data: Category[];
}

interface SetStateProps {
  setHoveredLink: (index: number | null) => void;
  onClose: () => void;
}
type Props = HoverStateProps & SetStateProps;
export const NavCategories: FC<Props> = ({
  data,
  hoveredLink,
  setHoveredLink,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    // const data = { categoryId: category.id };
    // handleSelectCategory?.(data);
    // onCategorySelect(data);
    navigate(`/category/${category.nameRu}`);
    onClose();
  };
  return (
    <Stack sx={{ width: "205px" }}>
      {data?.map((elem) => (
        <Box
          key={elem.id}
          onMouseEnter={() => setHoveredLink(elem.id)}
          sx={{
            fontFamily: "Graphic",
            height: 32,
            p: "8px 10px 0 10px",
            letterSpacing: "1.07px",
            cursor: "pointer",
          }}
        >
          <Stack
            sx={{
              color: hoveredLink === elem.id ? "#000" : "gray",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
            onClick={() => {
              handleCategoryClick(elem);
            }}
            direction="row"
          >
            <Typography
              sx={{
                fontFamily: "Graphic",
                fontSize: 14,
                fontWeight: 500,
                textTransform: "lowercase",
              }}
            >
              {elem.nameRu}
            </Typography>
            <KeyboardArrowRight sx={{ width: 17, height: 17 }} />
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};
