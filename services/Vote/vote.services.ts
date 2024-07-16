import axios from "@/utils/AxiosCustom/axios-customize";

const getListVote = (code?: any) => {
    return axios.get(`/vote_name/get/${code}`);
};
const postVote = (code?: any, id?: any, data?: any) => {
    return axios.post(`/vote_name/vote/${code}/${id}`, data);
};

export { getListVote, postVote };
