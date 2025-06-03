import { Box, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { BASE_URL } from "../../Fetcher/swrConfig";

export const GoldAppleNotification = ({
  image,
  message,
  icon,
  title,
}: {
  image?: string;
  message: string;
  icon?: ReactNode;
  title?: string;
}) => {
  console.log(image);

  return (
    <Box display="flex" p={0} alignItems="center" gap={1}>
      {image && (
        <img
          src={`${BASE_URL}/${image}`}
          style={{ width: 70, height: 70, objectFit: "cover" }}
          alt={image}
          crossOrigin="anonymous"
        />
      )}
      {icon}
      <Stack direction="column" gap={1}>
        <Typography
          color="#fff"
          variant="body2"
          fontFamily="Graphic"
          fontWeight="bold"
        >
          {message}
        </Typography>
        <Typography
          color="#fff"
          variant="body2"
          fontFamily="Graphic"
          fontWeight="bold"
        >
          {title}
        </Typography>
      </Stack>
    </Box>
  );
};
