export interface CartItem {
  product: {
    discountPrice: number;
    sellPrice: number;
  };
  quantity: number;
}
export interface imagesProps {
  image?: string;
  productStatus?: string;
  title: string;
  sellPrice?: number;
  discountPrice?: number;
  category?: string;
}
