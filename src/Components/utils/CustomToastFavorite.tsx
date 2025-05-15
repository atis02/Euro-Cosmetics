import { Box, Typography } from "@mui/material";
import { FavoriteBorderOutlined } from "@mui/icons-material";

export const GoldAppleNotification = ({
  image,
  message,
}: {
  image?: string;
  message: string;
}) => {
  return (
    <Box display="flex" p={0} alignItems="center" gap={1}>
      <img
        src={image}
        style={{ width: 70, height: 70, objectFit: "cover" }}
        alt=""
      />
      <FavoriteBorderOutlined />

      <Typography
        color="#fff"
        variant="body2"
        fontFamily="Graphic"
        fontWeight="bold"
      >
        {message}
      </Typography>
    </Box>
  );
};
