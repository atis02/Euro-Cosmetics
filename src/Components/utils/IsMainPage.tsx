import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setTextColor } from "../redux/reducers/swiperSlice";
import { useDispatch } from "react-redux";

export const IsMainPage = () => {
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTextColor("#000000"));
  }, [isMainPage]);

  return null;
};
