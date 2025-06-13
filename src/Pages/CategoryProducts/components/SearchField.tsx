import { IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { mainColor } from "../../../Components/utils/CustomStyles";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  setOpenSearch,
  setSearchValue,
} from "../../../Components/redux/reducers/swiperSlice";

interface Props {
  searchedValue: string;
  isMobile: boolean;
}

export const SearchFieldResultText: FC<Props> = ({
  searchedValue,
  isMobile,
}) => {
  const dispatch = useDispatch();
  return (
    <Stack
      height={isMobile ? "auto" : "10vh"}
      alignItems={"end"}
      direction="row"
      gap={2}
      width="100%"
      borderBottom="1px solid lightgray"
      mt={isMobile ? -1 : 0}
    >
      {!isMobile && (
        <Typography
          width={"50%"}
          color="#7F7F7F"
          fontSize={14}
          fontFamily="Graphic"
          textAlign="end"
        >
          результаты по запросу
        </Typography>
      )}
      <Typography
        onClick={() => {
          dispatch(setSearchValue(searchedValue));
          dispatch(setOpenSearch(true));
        }}
        sx={{
          cursor: "text",
          "&:hover": { color: mainColor },
        }}
        fontSize={isMobile ? 20 : 60}
        fontWeight={500}
        fontFamily="Graphic"
        width={isMobile ? "100%" : "50%"}
      >
        {searchedValue}
      </Typography>
      <IconButton
        onClick={() => {
          dispatch(setSearchValue(""));
          dispatch(setOpenSearch(true));
        }}
        sx={{ mb: isMobile ? 0 : 3 }}
      >
        <Close />
      </IconButton>
    </Stack>
  );
};
