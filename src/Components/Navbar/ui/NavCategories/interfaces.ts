export interface Segment {
  title: string;
}

export interface Subcategory {
  title: string;
  segments?: Segment[];
}

export interface Category {
  id: number;
  title: string;
  subcategories: Subcategory[];
}
