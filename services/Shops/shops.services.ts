import { AxiosRequestConfig } from "axios";
import axios from "../../utils/AxiosCustom/axios-customize";

const getListCategoryProducts = (data?: any) => {
    return axios.post(`/api_post/products`, data);
};

export { getListCategoryProducts };
