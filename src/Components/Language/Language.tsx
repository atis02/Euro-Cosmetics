import {
  Box,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import  { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Language = () => {
  const {  i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("lang") || "ru"
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  useEffect(() => {
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage, i18n]);
  interface HandleClickEvent extends React.MouseEvent<HTMLElement> {}

  const handleClick = (event: HandleClickEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLanguageChange = (lng:string) => {
    localStorage.setItem("lang", lng);
    setSelectedLanguage(lng);
    handleClose();
  };

  const lang =
    i18n.language === "tkm"
      ? {
          "&:hover": { backgroundColor: "#ECEFF1" },
        }
      : undefined;
  const lang2 =
    i18n.language === "ru"
      ? {
          "&:hover": { backgroundColor: "#ECEFF1" },
        }
      : undefined;

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          gap: { lg: "5px", md: "3px", xs: 0 },
        }}
        minHeight="32px"
      >
        {localStorage.getItem("lang") === "ru" ? (
          <Stack
            direction="row"
            border="0.1px solid gray"
            spacing={1}
            maxWidth={40}
            height={25}
          >
            <img src="/logos/rus.png" alt="" />
          </Stack>
        ) : (
          <Stack direction="row" spacing={1} maxWidth={40} height={25}>
            <img src="/logos/Tkm.png" alt="" />
          </Stack>
        )}
        <KeyboardArrowDownIcon
          sx={{
            ...(open ? { transform: "rotate(180deg)" } : ""),
            width: { lg: 24, md: 20, xs: 18 },
            height: { lg: 24, md: 20, xs: 18 },
          }}
        />
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ zIndex: "100000", position: "fixed" }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleLanguageChange("ru")} sx={lang2}>
          <Stack
            direction="row"
            border="0.1px solid gray"
            spacing={1}
            maxWidth={40}
            height={25}
          >
            <img src="/logos/rus.png" alt="" />
          </Stack>
        </MenuItem>

        <MenuItem sx={lang} onClick={() => handleLanguageChange("tkm")}>
          <Stack direction="row" spacing={1} maxWidth={40} height={25}>
            <img src="/logos/Tkm.png" alt="" />
          </Stack>
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default Language;
