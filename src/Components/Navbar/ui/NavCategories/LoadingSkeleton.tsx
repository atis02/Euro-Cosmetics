import { Stack, Skeleton } from "@mui/material";

const LoadingSkeleton = () => {
  return (
    <Stack direction="row" spacing={6}>
      <Stack spacing={2} sx={{ width: "205px" }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width="100%"
            height={22}
            sx={{ my: 0.5, borderRadius: 1 }}
          />
        ))}
      </Stack>
      <Stack spacing={2} sx={{ width: "205px" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width="100%"
            height={22}
            sx={{ my: 0.5, borderRadius: 1 }}
          />
        ))}
      </Stack>
      <Stack spacing={2} sx={{ width: "205px" }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width="100%"
            height={22}
            sx={{ my: 0.5, borderRadius: 1 }}
          />
        ))}
      </Stack>
      <Stack spacing={2} direction="row" sx={{ width: "480px" }}>
        {Array.from({ length: 2 }).map((_, i) => (
          <Stack direction="column" spacing={2} width="100%">
            <Skeleton
              key={i}
              variant="rectangular"
              width="100%"
              height={270}
              sx={{ my: 0.5, borderRadius: 1 }}
            />
            <Skeleton
              key={i}
              variant="rectangular"
              width="100%"
              height={270}
              sx={{ my: 0.5, borderRadius: 1 }}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default LoadingSkeleton;
