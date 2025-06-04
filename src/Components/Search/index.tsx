import { Box, Drawer, Stack } from "@mui/material";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { SearchField } from "./components/SearchField";
import { ChangeEvent } from "./components/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSearch } from "../redux/reducers/swiperSlice";

interface Props {
  isMobile: boolean | undefined;
}

const index: FC<Props> = ({ isMobile }) => {
  const [shrink, setShrink] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.swiper.openSearch);

  const handleScroll = useCallback(() => {
    if (scrollableRef.current) {
      const scrollY = scrollableRef.current.scrollTop;
      setShrink(scrollY > 30);
    }
  }, []);

  useEffect(() => {
    const el = scrollableRef.current;
    if (el && open) {
      el.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, [open, handleScroll]);

  const handleChange = (event: ChangeEvent): void => {
    setSearchValue(event.target.value);
  };

  return (
    <Box>
      <Drawer
        anchor="top"
        open={open}
        onClose={() => dispatch(setOpenSearch(false))}
        transitionDuration={300}
        SlideProps={{
          timeout: {
            enter: 600,
            exit: 400,
          },
        }}
        ModalProps={{
          BackdropProps: {
            sx: {
              top: "60px",
              backgroundColor: "rgba(0, 0, 0, 0)",
              boxShadow: "none",
              zIndex: 99,
            },
          },
        }}
        PaperProps={{
          sx: {
            position: "fixed",
            top: isMobile ? 67 : 65,
            height: "calc(100% - 65px)",
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            p: 0,
            zIndex: 99,
          },
        }}
        sx={{
          position: "fixed",
          top: "60px",
          zIndex: 99,
        }}
      >
        <Box
          ref={scrollableRef}
          onScroll={handleScroll}
          sx={{
            flex: 1,
            height: "100%",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            width="100%"
            position="sticky"
            top={0}
            bgcolor="#fff"
            zIndex={2}
          >
            <SearchField
              shrink={shrink}
              searchValue={searchValue}
              handleChange={handleChange}
              isMobile={isMobile}
            />
          </Stack>
          <Stack height="200vh" p={2}>
            {Array.from({ length: 100 }, (_, i) => (
              <Box key={i} p={1} borderBottom="1px solid #ccc">
                Продукт {i + 1}
              </Box>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
};

export default index;
