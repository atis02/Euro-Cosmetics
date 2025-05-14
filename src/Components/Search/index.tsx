import { Box, Drawer, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { SearchField } from "./components/SearchField";
import { ChangeEvent } from "./components/interfaces";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

interface Props {
  open: boolean;
  toggleDrawer: () => void;
}

const index: FC<Props> = ({ open, toggleDrawer }) => {
  const [shrink, setShrink] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 10);
    };

    if (open) {
      window.addEventListener("scroll", handleScroll);
    } else {
      setShrink(false);
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  const handleChange = (event: ChangeEvent): void => {
    setSearchValue(event.target.value);
  };
  return (
    <Box>
      <ParallaxProvider>
        <Drawer
          anchor="top"
          open={open}
          onClose={toggleDrawer}
          SlideProps={{
            timeout: {
              enter: 600,
              exit: 400,
            },
          }}
          PaperProps={{
            sx: {
              position: "fixed",
              top: "74px",
              height: "calc(100% - 74px)",
              boxShadow: "none",
              overflowY: "auto", // Enable vertical scroll
              display: "flex", // Ensure flexbox for layout
              flexDirection: "column",
            },
          }}
          ModalProps={{
            BackdropProps: {
              sx: {
                top: "74px",
                backgroundColor: "rgba(0, 0, 0, 0)",
                boxShadow: "none",
              },
            },
          }}
          sx={{
            position: "fixed",
            top: "74px",
          }}
          transitionDuration={300}
        >
          <Stack>
            <Stack width="100%" position="sticky" top={0} bgcolor="#fff">
              <Parallax translateY={[-120, 120]}>
                <SearchField
                  shrink={shrink}
                  searchValue={searchValue}
                  handleChange={handleChange}
                />
              </Parallax>
            </Stack>
            <Stack height="100vh">vfcdsd</Stack>
          </Stack>
        </Drawer>
      </ParallaxProvider>
    </Box>
  );
};
export default index;
