import { toastCore } from "@/lib/toast";
import { getListVote } from "@/services/Vote/vote.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useListVote = (param?: any) => {
    const listVoteString = localStorage.getItem("listVote");
    let listVote = [];

    if (listVoteString && listVoteString !== "undefined") {
        try {
            listVote = JSON.parse(listVoteString);
        } catch (error) {
            localStorage.setItem("listVote", "[]");
            listVote = [];
        }
    }

    return useQuery({
        queryKey: ["api_list_vote", param],
        queryFn: async () => {
            const { data } = await getListVote(param);
            if (!data?.result) {
                toastCore.error(data?.message);
            }
            return {
                ...data,
                data: data?.data?.map((x: any) => {
                    const match = listVote?.find((y: any) => y?.id === x?.id && y?.checked === true);
                    return {
                        ...x,
                        checked: match ? true : false,
                    };
                }),
            };
        },
    });
};
