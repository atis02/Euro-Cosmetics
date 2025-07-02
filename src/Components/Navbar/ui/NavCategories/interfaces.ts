
export interface Subcategory {
  id: string;
  nameRu: string;
  nameTm: string;
  image?: string;
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
export interface Brands {
  id: string;
  name: string;
  image: string;
}
export interface Status {
  id: number;
  nameRu: string;
  nameTm: string;
  image: string;
}