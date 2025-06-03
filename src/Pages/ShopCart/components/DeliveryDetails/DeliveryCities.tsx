import { Button, Stack } from "@mui/material";
import { FC } from "react";
import useSWR from "swr";
import { CitiesI } from "../interfaces";

interface DeliveryCitiesProps {
  selectedCity: string | null;
  setSelectedCity: (id: string) => void;
  errorFields: {
    deliveryCity: boolean;
  };
}
export const DeliveryCities: FC<DeliveryCitiesProps> = ({
  selectedCity,
  setSelectedCity,
  errorFields,
}) => {
  const handleSelect = (type: any) => {
    setSelectedCity(type.id);
  };
  const url = "/cities/fetch/client";
  const { data, error, isLoading } = useSWR({
    url: url,
  });

  return (
    <Stack maxWidth={{ lg: "40vw", xs: "100%" }}>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {!isLoading &&
          !error &&
          data?.orderCities?.length &&
          data.orderCities?.map((type: CitiesI) => (
            <Button
              key={type.id}
              variant={selectedCity === type.id ? "contained" : "outlined"}
              onClick={() => handleSelect(type)}
              sx={{
                textTransform: "revert",
                fontFamily: "Graphic",
                color: selectedCity === type.id ? "#fff" : "#000",
                backgroundColor: selectedCity === type.id ? "#000" : "#fff",
                borderColor: errorFields.deliveryCity
                  ? "red"
                  : selectedCity === type.id
                  ? "#000"
                  : "#ccc",
                "&:hover": {
                  backgroundColor:
                    selectedCity === type.id ? "#333" : "#f0f0f0",
                },
              }}
            >
              {type.nameRu} / {type.price} TMT
            </Button>
          ))}
      </Stack>
    </Stack>
  );
};
