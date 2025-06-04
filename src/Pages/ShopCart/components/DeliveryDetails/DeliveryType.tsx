import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { FC } from "react";
import useSWR from "swr";
import { DeliveryTypesI } from "../interfaces";

interface Props {
  deliveryMethod: string;
  setDeliveryMethod: (method: string) => void;
  errorFields: {
    deliveryMethod: boolean;
  };
}
export const DeliveryType: FC<Props> = ({
  deliveryMethod,
  setDeliveryMethod,
  errorFields,
}) => {
  const url = "/deliverytypes/fetch/client";
  const { data, error, isLoading } = useSWR({
    url: url,
  });
  return (
    <FormControl
      component="fieldset"
      error={errorFields?.deliveryMethod}
      sx={{ width: "100%" }}
    >
      <RadioGroup
        value={deliveryMethod}
        onChange={(e) => setDeliveryMethod(e.target.value)}
        name="delivery-method"
      >
        <Stack direction="row" spacing={{ lg: 4, md: 4, sm: 3, xs: 2 }}>
          {!isLoading &&
            !error &&
            data?.deliveryTypes?.length &&
            data.deliveryTypes?.map((type: DeliveryTypesI) => (
              <FormControlLabel
                key={type.id}
                value={type.id}
                control={
                  <Radio
                    sx={(theme) => {
                      const isError = errorFields.deliveryMethod;
                      const errorColor = theme.palette.error.main;
                      return {
                        color: "#999",
                        "&.Mui-checked": {
                          color: "#000",
                        },
                        ...(isError && {
                          color: errorColor,
                          "&.Mui-checked": {
                            color: errorColor,
                          },
                        }),
                      };
                    }}
                  />
                }
                label={
                  <span
                    style={{
                      fontFamily: "Graphic, sans-serif",
                      color: errorFields.deliveryMethod ? "tomato" : "#000",
                      fontSize: 16,
                    }}
                  >
                    {type.nameRu}
                  </span>
                }
              />
            ))}
        </Stack>
      </RadioGroup>
      {errorFields.deliveryMethod && (
        <FormHelperText sx={{ color: "error.main", mt: -0.5 }}>
          Выберите тип доставки
        </FormHelperText>
      )}
    </FormControl>
  );
};
