import {
  Box,
  Stack,
  Drawer,
  ListItem,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { rowSpaceStyle } from "../../../utils/CustomStyles";
import NavbarIconsPath from "../NavbarIconsPath";
import { Link } from "react-router-dom";
import { NavigateNextOutlined } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { NavbarCategoryMobile } from "./NavbarCategoryMobile";
import ContainerMobile from "../../../utils/ContainerMobile";
import { useTranslation } from "react-i18next";
import Language from "../../../Language/Language";

const NavbarMobile: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const { t } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const toggleDrawer = () => () => {
    setDrawerOpen(!drawerOpen);
  };
  const navs = [
    { label: t("navbar.catalog"), to: "/", type: "category" },
    { label: t("navbar.brands"), to: "/brands" },
    { label: t("navbar.novinki"), to: "/news/1" },
    { label: t("navbar.aksiya"), to: "/sales/100" },
    { label: t("navbar.markets"), to: "/markets" },
    {
      label: t("navbar.giftCard"),
      to: "/giftCard/gift",
      image: "/images/navImage2.png",
    },
    {
      label: t("navbar.aksiya50"),
      to: "/sales/50",
      color: "#FF329A",
      image: "/images/navImage.png",
    },
  ];

  return (
    <ContainerMobile borderBottom>
      <Stack
        sx={{
          ...rowSpaceStyle,
        }}
      >
        <Stack pt={4}>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer()}
            ModalProps={{
              BackdropProps: {
                sx: {
                  top: "60px",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  boxShadow: "none",
                },
              },
            }}
            SlideProps={{
              timeout: {
                enter: 600,
                exit: 400,
              },
            }}
            PaperProps={{
              sx: {
                position: "fixed",
                top: "60px",
                height: "calc(100% - 60px)",
                boxShadow: "none",
              },
            }}
            sx={{
              position: "fixed",
              top: "60px",
            }}
          >
            <AnimatePresence>
              {drawerOpen && !categoryDrawerOpen && (
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Box
                    sx={{
                      width: "100vw",
                      padding: 2,
                    }}
                    role="presentation"
                  >
                    <Stack>
                      {navs.map((nav: any, index: number) => (
                        <ListItem
                          key={index}
                          component={Link}
                          sx={{
                            padding: "5px 5px",
                          }}
                          to={isMobile && index == 0 ? "/" : nav.to}
                          onClick={() => {
                            if (index == 0) {
                              setCategoryDrawerOpen(true);
                            } else {
                              setDrawerOpen(false);
                            }
                          }}
                        >
                          {nav.image ? (
                            <img
                              src={nav.image}
                              style={{ width: 62, height: 49 }}
                              alt=""
                            />
                          ) : (
                            ""
                          )}
                          <Typography
                            sx={{
                              fontSize: 26,
                              fontWeight: 500,
                              textTransform: "lowercase",
                              fontFamily: "Graphic",
                              color: nav.color ? nav.color : "#000",
                            }}
                          >
                            {nav.label}
                          </Typography>
                          {index == 0 && (
                            <Stack width="100%" alignItems="end">
                              <NavigateNextOutlined sx={{ color: "#000" }} />
                            </Stack>
                          )}
                        </ListItem>
                      ))}
                    </Stack>
                    <Stack direction="row" mt={3} alignItems="center"justifyContent='center' gap={6}>
                      <Typography
                        fontFamily="Graphic"
                        fontWeight={500}
                        fontSize={24}
                      >
                        {t('navbar.language')}
                      </Typography>
                      <Language />
                    </Stack>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Drawer>
        </Stack>

        <NavbarIconsPath
          isMobile
          drawerOpen={drawerOpen}
          toggleDrawer={() => {
            setDrawerOpen(true);
            setCategoryDrawerOpen(false);
          }}
          onClose={() => setDrawerOpen(false)}
        />
        <NavbarCategoryMobile
          open={categoryDrawerOpen}
          onClose={() => {
            setDrawerOpen(true);
            setCategoryDrawerOpen(false);
          }}
        />
      </Stack>
    </ContainerMobile>
  );
};

export default NavbarMobile;
