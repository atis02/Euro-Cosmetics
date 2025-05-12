import { Stack } from "@mui/material";
import { CustomContainerAll } from "../../Components/utils/CustomContainerAll";
import { ProductImagesComponent } from "./components/ProductImagesComponent";
import { ProductDetails } from "./components/ProductDetails";
import { ProductTitleFeedBack } from "./components/ProductTitleFeedBack";
import { ProductBreadCrumbs } from "./components/ProductBreadCrumbs";
import CustomProductText from "../../Components/utils/CustomProductText";

const index = () => {
  const product = JSON.parse(localStorage.getItem("productEuroCos") || "{}");

  return (
    <CustomContainerAll>
      <Stack direction="row" alignItems="center">
        <ProductBreadCrumbs product={product} />
        <ProductTitleFeedBack product={product} />
      </Stack>
      <Stack direction={"row"} gap={10} justifyContent="space-between">
        <Stack maxWidth="65%">
          <ProductImagesComponent product={product} />
        </Stack>
        <Stack width="35%" mt={10}>
          <ProductDetails product={product} />
        </Stack>
      </Stack>
      <Stack direction="column" m={2} gap={2} width="100%">
        <CustomProductText
          width="60%"
          sai="end"
          fw={500}
          mainText={product.title}
        />
        <CustomProductText
          width="60%"
          color="gray"
          sai="end"
          mainText={product.articule}
        />

        <CustomProductText sai="end" width="60%" mainText={product.desc} />
      </Stack>
    </CustomContainerAll>
  );
};
export default index;
