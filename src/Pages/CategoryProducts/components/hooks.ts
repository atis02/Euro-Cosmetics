import axios from "axios";
import { BASE_URL } from "../../../Fetcher/swrConfig";
import { Brands, Category, Segment, Status, Subcategory } from "../../../Components/Navbar/ui/NavCategories/interfaces";

export const getBrands = async () => {
    const res = await axios.post(`${BASE_URL}/brands/fetch/admin`);
    return res.data.brands as Brands[];
  };
  export const getStatuses = async () => {
    const res = await axios.get(`${BASE_URL}/statuses/fetch/all`);


    return res.data.productStatuses as Status[];
  };
 export const getCategories = async () => {
    const res = await axios.get(`${BASE_URL}/categories/fetch/client`);
    return res.data.categories as Category[];
  };
export const  getGiftCards = async () => {
    const res = await axios.get(`${BASE_URL}/giftcard/active`);
    return res.data.banners as Category[];
  };
 export const getSubCategories = async () => {
    const res = await axios.get(`${BASE_URL}/subcategories/fetch/client`);
    return res.data.subCategories as Subcategory[];
  };

 export const getSegments = async () => {
    const res = await axios.get(`${BASE_URL}/segments/fetch/client`);
    return res.data.segments as Segment[];
  };