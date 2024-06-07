import { AxiosRequestConfig } from "axios";
import axios from "../../utils/AxiosCustom/axios-customize";

// lấy bộ lịch danh sách trong tháng
const getListHandbook = (id: string | number, param?: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };

    return axios.get(`/Api_post/news/${id}`, config)
}

export {
    getListHandbook
}
