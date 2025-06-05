import { FC } from "react";
import { Modal, Box, Fade } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ProductImageZoomModal: FC<Props> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Modal open={open} closeAfterTransition onClose={onClose}>
      <Fade in={open} timeout={500}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: "white",
            boxShadow: "none",
            outline: "none",
            m: 0,
            p: 0,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};
