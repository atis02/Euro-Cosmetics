import { CustomContainerAll } from "../../../Components/utils/CustomContainerAll";
import { Skeleton, Stack } from "@mui/material";

export const ProductDetailSkeleton = () => {
  return (
    <CustomContainerAll>
      <Stack
        direction={{ lg: "row", md: "column", sm: "column", xs: "column" }}
        alignItems={{
          lg: "start",
          md: "center",
          sm: "center",
          xs: "column",
        }}
        gap={2}
        mb={2}
      >
        <Stack spacing={1} sx={{ width: "55vw" }}>
          <Stack spacing={1} direction="row" sx={{ width: "305px" }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width="100%"
                height={22}
                sx={{ my: 0.5, borderRadius: 1 }}
              />
            ))}
          </Stack>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={570}
            sx={{ my: 0.5, borderRadius: 1 }}
          />
        </Stack>
        <Stack spacing={2} sx={{ width: "35vw" }}>
          <Stack spacing={1} direction="column" sx={{ width: "100%" }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width="100%"
                height={42}
                sx={{ my: 0.5, borderRadius: 1 }}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </CustomContainerAll>
  );
};
