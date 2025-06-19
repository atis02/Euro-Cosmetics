import { FC } from "react";
import { MobileSwipeProducts } from "../../../Components/utils/MobileSwipeProducts";
import ProductSwiper from "../../../Components/utils/productsSwiper/ProductsSwiper";
import { ProductLoading } from "./ProductLoading";

interface Props {
  data: any;
  error: any;
  loading: boolean;
  label: string;
  center?: boolean;
  isMobile?: boolean;
}
export const RenderProducts: FC<Props> = ({
  data,
  error,
  loading,
  label,
  center,
  isMobile,
}) => {
    
  if (loading) return <ProductLoading />;
  if (isMobile && loading) return <ProductLoading isMobile />;
  if (isMobile)
    return (
      <MobileSwipeProducts
        products={data}
        text={label}
        isMobile
        p={1}
        mt={3}
        width="100vw"
        isLoading={loading}
      />
    );
  if (!error && data?.products?.length)
    return (
      <ProductSwiper
        text={label}
        data={data}
        error={error}
        isLoading={loading}
        center={center}
      />
    );
  return null;
};
