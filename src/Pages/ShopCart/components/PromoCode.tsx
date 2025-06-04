import { TextField, InputAdornment, IconButton } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";

export const PromoCode = () => {
  const [promocode, setPromocode] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPromocode(event.target.value);
  };
  return (
    <TextField
      variant="outlined"
      placeholder="Введите промокод"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              sx={{
                bgcolor: promocode !== "" ? "#000" : "lightgray",
                opacity: promocode !== "" ? "none" : "50%",
                "&:hover": { bgcolor: "lightgray" },
              }}
            >
              <ArrowForward
                sx={{
                  color: promocode !== "" ? "#fff" : "#000",
                }}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          transition: "border 0.3s",
          mt: { lg: 5, md: 4, sm: 3, xs: 1 },
          border: "2px dashed #000",
          "& fieldset": {
            border: "1px solid transparent", // default (invisible)
          },
          "&:hover fieldset": {
            border: "none",
          },
          "&.Mui-focused fieldset": {
            border: "none",
          },
        },
      }}
      fullWidth
      value={promocode}
      onChange={handleChange}
    />
  );
};
