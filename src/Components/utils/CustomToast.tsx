import toast from "react-hot-toast";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography, Paper, Slide } from "@mui/material";

export const showCustomToast = (message = "Added to cart") => {
  toast.custom((t) => (
    <Slide in={t.visible} direction="left">
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1.5,
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: 3,
          minWidth: 300,
          maxWidth: 400,
        }}
      >
        <CheckCircleIcon style={{ marginRight: 12 }} />
        <Typography variant="body2" fontWeight={500}>
          {message}
        </Typography>
      </Paper>
    </Slide>
  ));
};
