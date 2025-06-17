import { Close } from "@mui/icons-material";
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from "@mui/material";
import { useState } from "react";

const index = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Stack mt={3}>
      <Typography fontFamily="Graphic" textAlign="center" fontSize={13}>
        Нажимая оформить заказ вы согдащаетесь{" "}
        <span
          onClick={handleOpen}
          style={{
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
          }}
        >
          {" "}
          условиями
        </span>{" "}
        доставки
      </Typography>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Stack direction='row' justifyContent='space-between'>
          <DialogTitle>Условия доставки</DialogTitle>
          <DialogActions>
            <IconButton sx={{color:'#000',borderRadius:'0',border:'1px solid #000' }} onClick={handleClose}>
              <Close />
            </IconButton>
          </DialogActions>
        </Stack>
        <DialogContent dividers>
          <Typography gutterBottom>
            1. Доставка осуществляется в рабочие дни с 9:00 до 18:00.
          </Typography>
          <Typography gutterBottom>
            2. Сроки доставки зависят от региона и выбранного способа доставки.
          </Typography>
          <Typography gutterBottom>
            3. Бесплатная доставка при заказе от 500 TMT.
          </Typography>
          <Typography gutterBottom>
            4. Подробные условия доставки вы можете уточнить у менеджера.
          </Typography>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};
export default index;
