export interface CartItem {
  product: {
    discountValue: number;
    currentSellPrice: number;
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
  barcode: string;
}
export interface StoryInterface {
  id: number;
  name: string;
  link: string;
  image: string;
  video: string;
  order: number;
  titleTm: string;
  titleRu: string;
  contentTm: string;
  contentRu: string;
  isActive: boolean;
  productBarcode: string;
  ProductsArray: string[];
  categoryId: string;
  subCategoryId: string;
  segmentId: string;
  brandId: string;
  createdAt: string;
  updatedAt: string;
  Product: string;
  Category: string;
  SubCategory: string;
  Segment: string;
  Brand: string;
}
