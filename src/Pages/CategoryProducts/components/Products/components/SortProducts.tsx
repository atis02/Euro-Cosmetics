import { FC, } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { mainColor } from "../../../../../Components/utils/CustomStyles";
import { ExpandMore } from "@mui/icons-material";

const options = [
  { value: "popular", label: "по популярности" },
  { value: "sale", label: "по величине скидки" },
  { value: "currentSellPrice-asc", label: "сначала дешевые" },
  { value: "currentSellPrice-desc", label: "сначала дороже" },
];
interface Props {
 setSelectedSort: (value: string) => void;
  selectedSort: string;
}
const SortProducts: FC<Props> = ({ selectedSort, setSelectedSort }) => {
  // const [value, sortBy] = useState(options[0].value);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSort(event.target.value);
  };

  return (
    <Select
      value={selectedSort}
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
            fontWeight: selectedSort === option.value ? 500 : 400,
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
