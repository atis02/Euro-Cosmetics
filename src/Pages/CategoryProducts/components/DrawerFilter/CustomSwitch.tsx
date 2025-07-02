import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { FC } from "react";
import { rowSpaceStyle } from "../../../../Components/utils/CustomStyles";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 45,
  height: 25,
  padding: 0,
  display: "flex",
  "&:active .MuiSwitch-thumb": {
    width: 20,
  },
  "& .MuiSwitch-switchBase": {
    padding: 3,
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#000",
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 21,
    height: 20,
    borderRadius: 10,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 25 / 2,
    opacity: 1,
    backgroundColor: "#ccc",
    boxSizing: "border-box",
  },
}));

interface Props {
  onChange: (value: boolean) => void;
  checked: boolean;
}
const CustomSwitch: FC<Props> = ({ checked, onChange }) => {
  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    onChange(checked);
  };
  return (
    <Stack sx={rowSpaceStyle} spacing={2}>
      <Typography pt={3} fontFamily="Graphic" fontSize={16} fontWeight={500}>
        со скидкой
      </Typography>
      <StyledSwitch checked={checked} onChange={handleChange} />
    </Stack>
  );
};

export default CustomSwitch;
