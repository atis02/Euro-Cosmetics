import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
  expanded: boolean;
  setExpanded: (val: boolean) => void;
  isHasValue: boolean;
  text: string;
};

const CustomAccordion: FC<Props> = ({
  children,
  expanded,
  setExpanded,
  isHasValue,
  text,
}) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{
        border: isHasValue ? "1px solid red" : "1px solid #ccc",
         "&.Mui-expanded": {
      margin: 0,
    },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography sx={{ fontFamily: "Graphic", fontWeight: "500" }}>
          {text}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
