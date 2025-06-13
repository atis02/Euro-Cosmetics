import { Box, Drawer, Stack } from "@mui/material";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { SearchField } from "./components/SearchField";
import { ChangeEvent } from "./components/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSearch } from "../redux/reducers/swiperSlice";
import { BASE_URL } from "../../Fetcher/swrConfig";
import { images } from "../../Pages/Product/components/interfaces";
import Products from "../../Pages/CategoryProducts/components/Products/Products";
import { ProductLoading } from "../../Pages/Main/components/ProductLoading";
import MobileProducts from "../../Pages/CategoryProducts/components/Products/MobileProducts";

interface Props {
  isMobile: boolean | undefined;
}

const index: FC<Props> = ({ isMobile }) => {
  const [shrink, setShrink] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.swiper.openSearch);
  const searchVal = useSelector((state: any) => state.swiper.searchValue);
  const [products, setProducts] = useState<images[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async (query: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/products/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setProducts(data.products); // Assuming `data` is an array of products
    } catch (error) {
      console.log(error);
      error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setSearchValue(searchVal);
  }, [searchVal]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchValue.trim().length > 1) {
        fetchProducts(searchValue);
      } else {
        setProducts([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, fetchProducts]);

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
              zIndex: 199,
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
            zIndex: 199,
          },
        }}
        sx={{
          position: "fixed",
          top: "60px",
          zIndex: 199,
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
              handleClose={() => dispatch(setOpenSearch(false))}
            />
          </Stack>
          <Stack>
            {loading ? (
              <Box>
                <ProductLoading isMobile={isMobile} />
              </Box>
            ) : products.length && isMobile ? (
              <MobileProducts
                product={products}
                close={() => dispatch(setOpenSearch(false))}
              />
            ) : (
              <Products
                product={products}
                close={() => dispatch(setOpenSearch(false))}
              />
            )}
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
};

export default index;
