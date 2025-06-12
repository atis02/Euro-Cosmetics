export interface Segment {
  nameRu: string;
  nameTm: string;
  id: string;
  subCategoryId?: string;
  SubCategory: Subcategory;
}

export interface Subcategory {
  id: string;
  nameRu: string;
  nameTm: string;
  image?: string;
  Segments?: Segment[];
  categoryId?: string;
}

export interface Category {
  id: number;
  nameRu: string;
  nameTm: string;
  image: string;
  coverImage: string;
  SubCategories: Subcategory[];
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
