import { InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import CustomAccordion from "../../../../Components/utils/CustomAccordion";

type Props = {
  nameClient:string;
  city: string;
  comment: string;
  phoneNumber: string;
  setNameClient: (value: string) => void;
  setComment: (value: string) => void;
  setCity: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  errorFields: {
    nameClient: boolean;
    city: boolean;
    phoneNumber: boolean;
  };
};

const ShopDetailFields: React.FC<Props> = ({
  nameClient,
  city,
  comment,
  phoneNumber,
  errorFields,
  setNameClient,
  setCity,
  setComment,
  setPhoneNumber,
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);
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
                    sx={{ paddingRight: 0.5,color: errorFields.phoneNumber?'tomato':'#000' }}
                  >
                    +993
                  </Stack>
                </InputAdornment>
              ),
            }}
            sx={{ ...style, mt: 2 }}
            fullWidth
            error={errorFields.phoneNumber}
            helperText={errorFields.phoneNumber ? "Заполните поле" : ""}
          />
           <TextField
            label="Имя клиента"
            value={nameClient}
            onChange={(e) => setNameClient(e.target.value)}
            fullWidth
            variant="standard"
            sx={style}
            required
            error={errorFields.nameClient}
            helperText={errorFields.nameClient ? "Заполните поле" : ""}
          />
          <TextField
            label="Адрес"
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
