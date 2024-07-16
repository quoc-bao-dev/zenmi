import { getListVote } from "@/services/Vote/vote.services";
import { useQuery } from "@tanstack/react-query";

export const useListVote = (param?: any) => {
    const listVote = JSON.parse(localStorage.getItem("listVote") || "[]");

    return useQuery({
        queryKey: ["api_list_vote", param?.searchParams?.id],
        queryFn: async () => {
            const { data } = await getListVote("Ml8xODY4OA");
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
