import { Box, Stack, Typography, Link, IconButton } from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  WhatsApp,
  Telegram,
} from "@mui/icons-material";
import { FC } from "react";
import { hoverStyle } from "../../Components/utils/CustomStyles";
import CustomContainerMain from "../../Components/utils/CustomContainerMain";

const Footer: FC = () => {
  const icons = [
    { icon: <WhatsApp />, href: "https://whatsapp.com" },
    { icon: <Telegram />, href: "https://telegram.com" },
    { icon: <Facebook />, href: "https://facebook.com" },
    { icon: <Twitter />, href: "https://twitter.com" },
    { icon: <Instagram />, href: "https://instagram.com" },
    { icon: <YouTube />, href: "https://youtube.com" },
  ];
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "white",
        py: 3,
        mt: 4,
        position: "relative",
        marginTop: "auto",
      }}
    >
      <CustomContainerMain>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "center", sm: "flex-start" }}
          spacing={3}
          sx={{ px: 2 }}
        >
          <Stack spacing={1}>
            <Typography variant="h6" sx={hoverStyle}>
              Euro Cosmetics
            </Typography>
            <Typography variant="body2">
              © 2025 Alem Tilsimat. All Rights Reserved.
            </Typography>
          </Stack>

          {/* Middle Section (Links) */}
          <Stack
            direction="row"
            spacing={4}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Link href="#" color="inherit" underline="hover">
              о нас
            </Link>
            <Link href="#" color="inherit" underline="hover">
              клиентам
            </Link>
            <Link href="#" color="inherit" underline="hover">
              контакты
            </Link>
          </Stack>

          <Stack direction="row" spacing={2}>
            {icons.map((icon) => (
              <IconButton
                key={icon.href}
                color="inherit"
                target="_blank"
                href={icon.href}
                sx={{ color: "#919191", "&:hover": { color: "#CCCCCC" } }}
              >
                {icon.icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>

        <Stack
          direction="column"
          spacing={1}
          sx={{ display: { xs: "flex", sm: "none" }, mt: 2, px: 2 }}
        >
          <Link href="#" color="inherit" underline="hover">
            о нас
          </Link>
          <Link href="#" color="inherit" underline="hover">
            клиентам
          </Link>
          <Link href="#" color="inherit" underline="hover">
            контакты
          </Link>
        </Stack>
      </CustomContainerMain>
    </Box>
  );
};

export default Footer;
