import { Button, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import PriceRangeFilter from "./PriceRangeFilter";
import { Close } from "@mui/icons-material";
import {
  rowCenterStyle,
  rowSpaceStyle,
} from "../../../../Components/utils/CustomStyles";
import CustomSwitch from "./CustomSwitch";
import { CustomButton } from "../../../../Components/utils/CustomButton";

type Props = {
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (value: boolean) => void;
  setPriceRange: (range: [number, number]) => void;
  setGetDiscount: (value: boolean) => void;
  getDiscount: boolean;
  priceRange: [number, number];
  productsLength: number;
};

const DrawerFilters: FC<Props> = ({
  isFilterDrawerOpen,
  setIsFilterDrawerOpen,
  setPriceRange,
  setGetDiscount,
  priceRange,
  getDiscount,
  productsLength,
}) => {

  return (
    <Drawer
      anchor="left"
      open={isFilterDrawerOpen}
      onClose={() => setIsFilterDrawerOpen(false)}
      PaperProps={{
        sx: { width: 420, p: 4 },
      }}
    >
      <Stack gap={3}>
        <Stack sx={rowSpaceStyle} mb={3}>
          <Stack sx={{ ...rowCenterStyle, flexDirection: "row" }}>
            <Typography fontSize={24} fontWeight={500} fontFamily="Graphic">
              Фильтры
            </Typography>
            {(getDiscount == true || priceRange[0] > 0) && (
              <Button
                variant="outlined"
                onClick={() => {
                  setGetDiscount(false);
                  setPriceRange([0, 10000]);
                }}
                sx={{
                  pt: 2,
                  color: "#000",
                  border: "none",
                  textTransform: "none",
                  fontFamily: "Graphic",
                  fontSize: 16,
                  fontWeight: 400,
                }}
              >
                сбросить
              </Button>
            )}
          </Stack>
          <IconButton onClick={() => setIsFilterDrawerOpen(false)}>
            <Close sx={{ color: "#000" }} />
          </IconButton>
        </Stack>
        <CustomSwitch checked={getDiscount} onChange={setGetDiscount} />
        <PriceRangeFilter
          min={0}
          max={10000}
          value={priceRange}
          onChange={setPriceRange}
        />
        <CustomButton width="100%" func={()=>setIsFilterDrawerOpen(false)} text={`показать ${productsLength} товар`} />
      </Stack>
    </Drawer>
  );
};

export default DrawerFilters;
