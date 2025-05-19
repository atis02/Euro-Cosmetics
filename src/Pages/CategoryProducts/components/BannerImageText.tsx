import { Stack } from "@mui/material";
import { FC } from "react";
import { CustomBreadcrumb } from "../../../Components/utils/CustomBreadCrumb";
import CustomProductText from "../../../Components/utils/CustomProductText";
import { Category } from "../../../Components/Navbar/ui/NavCategories/interfaces";

type Props = {
  isMobile: boolean;
  isTablet: boolean;
  category: Category;
};

const BannerImageText: FC<Props> = ({ isMobile, isTablet, category }) => {
  return (
    <>
      <Stack position="absolute" top={isMobile ? "13%" : "50%"} zIndex={100}>
        <CustomBreadcrumb color="#fff" category={category} />
      </Stack>
      <Stack
        position="absolute"
        top={isMobile ? "37%" : "45%"}
        zIndex={100}
        left={isMobile ? "3%" : "50%"}
      >
        <CustomProductText
          color="#fff"
          fw={500}
          text={category.title}
          fz={isMobile ? 35 : isTablet ? 45 : 60}
        />
      </Stack>
    </>
  );
};

export default BannerImageText;
