import { Slider, Stack, Typography } from "@mui/material";
import CountUp from "react-countup";

interface Props {
  min: number;
  max: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
}

const PriceRangeFilter = ({ min, max, onChange ,value}: Props) => {
  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const range = newValue as [number, number];
    onChange(range);
  };

  return (
    <Stack gap={3}>
      <Typography mb={1} fontFamily="Graphic" fontSize={16} fontWeight={500}>
        Цена
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <CountUp
          end={value[0]}
          duration={0.6}
          suffix=" TMT"
          prefix="от "
          separator=" "
          style={{
            fontWeight: 500,
            fontFamily: "Graphic",
          }}
        />
        <CountUp
          end={value[1]}
          duration={0.6}
          suffix=" TMT"
          prefix="до "
          separator=" "
          style={{
            fontWeight: 500,
            fontFamily: "Graphic",
          }}
        />
      </Stack>
      <Slider
        value={value}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        sx={{
          mb: 2,
          color: "#000", // primary color
          height: 3,
          "& .MuiSlider-thumb": {
            width: 28,
            height: 28,
            backgroundColor: "#fff",
            border: "2px solid #000",
            "&:hover": {
              boxShadow: "0 0 0 6px rgba(0,0,0,0.1)",
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.3,
            backgroundColor: "#999",
          },
          "& .MuiSlider-track": {
            backgroundColor: "#000",
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "#000",
          },
        }}
      />
    </Stack>
  );
};

export default PriceRangeFilter;
