import { Box, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export const GoldAppleNotification = ({
  image,
  message,
  icon,
  title,
}: {
  image?: string;
  message: string;
  icon?: ReactNode;
  title: string;
}) => {
  return (
    <Box display="flex" p={0} alignItems="center" gap={1}>
      <img
        src={image}
        style={{ width: 70, height: 70, objectFit: "cover" }}
        alt=""
      />
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
