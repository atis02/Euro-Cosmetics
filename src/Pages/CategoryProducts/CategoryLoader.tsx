import { Stack } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import { ProductLoading } from "../Main/components/ProductLoading";
import { FC } from "react";

interface Props {
  isMobile: boolean;
}
export const CategoryLoader: FC<Props> = ({ isMobile }) => {
  return (
    <Stack gap={2} mb={2}>
      <Skeleton width="100%" height={isMobile ? "32vh" : "60vh"} />
      <Stack direction="row" justifyContent="center" gap={2}>
        {Array.from({ length: isMobile ? 2 : 7 }, (_, i) => (
          <Skeleton key={i} height={60} width={160} borderRadius={100} />
        ))}
      </Stack>
      <Stack mt={isMobile ? 1 : 4} direction="row" ml={4} gap={2}>
        <Skeleton height={40} width={64} />
        <Skeleton height={40} width={isMobile ? 190 : 210} />
        <Skeleton height={40} width={104} />
      </Stack>
      <ProductLoading isMobile />
    </Stack>
  );
};
