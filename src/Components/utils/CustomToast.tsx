import { ReactNode } from "react";
import { GoldAppleNotification } from "./CustomToastFavorite";
import { toast } from "react-toastify";

interface Props {
  image?: string;
  text: string;
  title?: string;
  icon?: ReactNode;
}
export const OpenNotification = ({ image, text, icon, title }: Props): void => {
  toast(
    <GoldAppleNotification
      image={image}
      message={text}
      icon={icon}
      title={title}
    />,
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    }
  );
};
