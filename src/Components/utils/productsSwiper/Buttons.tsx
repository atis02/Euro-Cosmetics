import { IconButton, Stack } from "@mui/material";
import { West, East } from "@mui/icons-material";
import { FC } from "react";
import { hoverStyle } from "../CustomStyles";

type Props = {
  handlePrev: () => void;
  handleNext: () => void;
  index?: number | undefined;
  maxIndex: number;
};

const disabledColor = "#ccc";
const activeColor = "#000";

const Buttons: FC<Props> = ({ handlePrev, handleNext, index, maxIndex }) => {
  const isPrevDisabled = index === 0;
  const isNextDisabled = index !== undefined && index >= maxIndex;

  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <IconButton
        onClick={handlePrev}
        sx={{ p: 0, ...hoverStyle }}
        disabled={isPrevDisabled}
      >
        <West sx={{ color: isPrevDisabled ? disabledColor : activeColor }} />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{ p: 0, ...hoverStyle }}
        disabled={isNextDisabled}
      >
        <East sx={{ color: isNextDisabled ? disabledColor : activeColor }} />
      </IconButton>
    </Stack>
  );
};

export default Buttons;
