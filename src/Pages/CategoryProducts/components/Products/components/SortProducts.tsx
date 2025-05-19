import { useState } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { mainColor } from "../../../../../Components/utils/CustomStyles";
import { ExpandMore } from "@mui/icons-material";

const options = [
  { value: "popular", label: "по популярности" },
  { value: "rating", label: "по рейтингу" },
  { value: "sale", label: "по величине скидки" },
  { value: "cheap", label: "сначала дешевые" },
  { value: "expensive", label: "сначала дороже" },
];
const SortProducts = () => {
  const [value, setValue] = useState(options[0].value);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      variant="standard"
      disableUnderline
      IconComponent={(props) => (
        <ExpandMore
          {...props}
          sx={{
            color: "gray",
            ".MuiSelect-root:hover &": {
              color: mainColor,
            },
          }}
        />
      )}
      sx={{
        borderRadius: "12px",
        px: 2,
        py: 1,
        fontFamily: "Graphic",
        fontWeight: 500,
        maxWidth: 250,
        fontSize: 18,

        "&:hover": { color: mainColor },
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          sx={{
            "&:hover": { color: mainColor },
            bgcolor: "#fff",
            fontWeight: value === option.value ? 500 : 400,
            fontFamily: "Graphic",
          }}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SortProducts;
