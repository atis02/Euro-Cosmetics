import { Button, Stack } from "@mui/material";
import { FC } from "react";
import useSWR from "swr";
import { DeliveryTypesI } from "../interfaces";

interface DeliveryCitiesProps {
  selectedPaymentType: string | null;
  setSelectedPaymentType: (id: string) => void;
  errorFields: {
    paymentType: boolean;
  };
}
export const PaymentType: FC<DeliveryCitiesProps> = ({
  selectedPaymentType,
  setSelectedPaymentType,
  errorFields,
}) => {
  const url = "/paymenttypes/fetch/client";
  const { data, error, isLoading } = useSWR({
    url: url,
  });

  return (
    <Stack maxWidth={{ lg: "40vw", xs: "100%" }}>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {!isLoading &&
          !error &&
          data?.paymentTypes?.length &&
          data.paymentTypes?.map((type: DeliveryTypesI) => (
            <Button
              key={type.id}
              variant={
                selectedPaymentType === String(type.id)
                  ? "contained"
                  : "outlined"
              }
              onClick={() => setSelectedPaymentType(String(type.id))}
              sx={{
                textTransform: "revert",
                fontFamily: "Graphic",
                color:
                  selectedPaymentType === String(type.id) ? "#fff" : "#000",
                backgroundColor:
                  selectedPaymentType === String(type.id) ? "#000" : "#fff",
                borderColor: errorFields.paymentType
                  ? "red"
                  : selectedPaymentType === String(type.id)
                  ? "#000"
                  : "#ccc",
                "&:hover": {
                  backgroundColor:
                    selectedPaymentType === String(type.id)
                      ? "#333"
                      : "#f0f0f0",
                },
              }}
            >
              {type.nameRu}
            </Button>
          ))}
      </Stack>
    </Stack>
  );
};
