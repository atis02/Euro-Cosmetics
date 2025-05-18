export interface CartItem {
  product: {
    discountPrice: number;
    sellPrice: number;
  };
  quantity: number;
}
