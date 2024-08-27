import { getUiVote } from "@/services/Vote/vote.services";
import { useQuery } from "@tanstack/react-query";

export const useVoteContent = () => {
    return useQuery({
        queryKey: ["api_vote_content"],
        queryFn: async () => {
            const { data } = await getUiVote();
            return data;
        },
    });
};
