import { Stack } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import { FC } from "react";

interface Props {
  isMobile?: boolean;
}
export const ProductLoading: FC<Props> = ({ isMobile }) => {
  if (isMobile) {
    return (
      <Stack
        mt={3}
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        gap={2}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <Stack key={i} width="48%">
            <Skeleton
              style={{
                width: "100%",
                height: 280,
                borderRadius: 8,
              }}
            />
            <Stack mt={1} alignItems="end">
              <Skeleton
                style={{
                  width: 80,
                  height: 10,
                  borderRadius: 8,
                }}
              />
              <Skeleton
                style={{
                  width: 180,
                  height: 10,
                  borderRadius: 8,
                }}
              />
              <Skeleton
                style={{
                  width: 200,
                  height: 10,
                  borderRadius: 8,
                }}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    );
  } else {
    return (
      //   <CustomContainerMain>
      <Stack mt={1} p={5} direction="row" justifyContent="space-between">
        {Array.from({ length: 4 }).map((_, i) => (
          <Stack key={i}>
            <Skeleton
              style={{
                width: 320,
                height: 280,
                borderRadius: 8,
              }}
            />
            <Stack mt={1} alignItems="end" gap={1}>
              <Skeleton
                style={{
                  width: 80,
                  height: 20,
                  borderRadius: 8,
                }}
              />
              <Skeleton
                style={{
                  width: 280,
                  height: 20,
                  borderRadius: 8,
                }}
              />
              <Skeleton
                style={{
                  width: 220,
                  height: 20,
                  borderRadius: 8,
                }}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
      //   </CustomContainerMain>
    );
  }
};
