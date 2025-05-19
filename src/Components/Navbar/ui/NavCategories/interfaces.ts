export interface Segment {
  title: string;
}

export interface Subcategory {
  title: string;
  image?: string;
  segments?: Segment[];
}

export interface Category {
  id: number;
  title: string;
  image: string;
  subcategories: Subcategory[];
}
// export interface Category {
//   id: number;
//   deliveryPrice: number | string;
//   discountType: number | string;
//   discountValue: number | string;
//   image: string;
//   isActive: boolean;
//   nameRu: string;
//   nameTm: string;
//   order: number;

//   subcategories: Subcategory[];
// }
