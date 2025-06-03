import { InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import CustomAccordion from "../../../../Components/utils/CustomAccordion";

type Props = {
  city: string;
  comment: string;
  setComment: (value: string) => void;
  setCity: (value: string) => void;
  errorFields: {
    city: boolean;
    phoneNumber: boolean;
  };
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
};

const ShopDetailFields: React.FC<Props> = ({
  city,
  setCity,
  comment,
  setComment,
  phoneNumber,
  setPhoneNumber,
  errorFields,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const style = {
    "& .MuiInput-underline:after": {
      borderBottomColor: "#000",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#000",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "#000",
    },
    "& label.Mui-focused": {
      color: "#000",
    },
  };
  return (
    <CustomAccordion
      expanded={expanded}
      setExpanded={setExpanded}
      isHasValue={errorFields.city}
      text="Данные получателя"
      children={
        <Stack>
          <TextField
            type="text"
            //   label={t("login.phoneNumber")}
            // label="Номер телефона"
            variant="standard"
            value={phoneNumber}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue.length <= 8) {
                setPhoneNumber(newValue);
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Stack
                    borderRight="1px solid lightgray"
                    sx={{ paddingRight: 0.5 }}
                  >
                    +993
                  </Stack>
                </InputAdornment>
              ),
            }}
            sx={{ ...style, mt: 2 }}
            fullWidth
            // required
            error={errorFields.phoneNumber}
            helperText={errorFields.phoneNumber ? "Заполните поле" : ""}
          />
          <TextField
            label="Город"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            variant="standard"
            sx={style}
            required
            error={errorFields.city}
            helperText={errorFields.city ? "Заполните поле" : ""}
          />
          <TextField
            label="Комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            variant="standard"
            sx={style}
          />
        </Stack>
      }
    />
  );
};

export default ShopDetailFields;
