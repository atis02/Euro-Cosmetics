import { IconButton, Stack } from "@mui/material";
import { hoverButtonIcon } from "../CustomStyles";
import { West, East } from "@mui/icons-material";
import { FC } from "react";

type Props = {
  handlePrev: () => void;
  handleNext: () => void;
  index: number;
  maxIndex: number;
};

const Buttons: FC<Props> = ({ handlePrev, handleNext, index, maxIndex }) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <IconButton onClick={handlePrev} sx={{ p: 0 }} disabled={index === 0}>
        <West sx={hoverButtonIcon} />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{ p: 0 }}
        disabled={index >= maxIndex}
      >
        <East sx={hoverButtonIcon} />
      </IconButton>
    </Stack>
  );
};

export default Buttons;
