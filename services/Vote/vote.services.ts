import axios from "@/utils/AxiosCustom/axios-customize";

const getListVote = (code?: any) => {
    return axios.get(`/vote_name/get/${code}`);
};
const postVote = (code?: any, id?: any, data?: any) => {
    return axios.post(`/vote_name/vote/${code}/${id}`, data);
};
const postArrayVote = (code?: any, data?: any) => {
    return axios.post(`/vote_name/vote_list/${code}`, data);
};

/// api giao diện
const getUiVote = () => {
    return axios.get(`/vote_name/get_info_field`);
};

export { getListVote, postVote, getUiVote, postArrayVote };
