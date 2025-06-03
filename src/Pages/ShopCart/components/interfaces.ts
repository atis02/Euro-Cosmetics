export interface CitiesI {
  id: number | string;
  nameTm: string;
  nameRu: string;
  order: number;
  price: number;
  isActive: boolean;
}
export interface DeliveryTypesI {
  id: number | string;
  nameTm: string;
  nameRu: string;
  time?: string;
  isActive: boolean;
}
