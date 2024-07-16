import useCookie from "@/hooks/useCookie";
import { toastCore } from "@/lib/toast";
import { postVote } from "@/services/Vote/vote.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useVote = () => {
    const formData = new FormData();

    const queryClient = useQueryClient();

    const onsubmitVote = useMutation({
        mutationFn: async ({ formData, id }: any) => {
            const { data } = await postVote("Ml8xODY4OA", id, formData);
            return data;
        },
    });

    const onClickVote = async (data: any) => {
        formData.append("name", "");
        formData.append("relationship", "");
        formData.append("note", "");

        const cacheData = queryClient.getQueryData(["api_list_vote"]) as any;

        const tunOffLove = cacheData?.data?.map((x: any) => ({
            ...x,
            checked: x?.id == data?.id ? !x?.checked : x?.checked,
        }));

        queryClient.setQueryData(["api_list_vote"], { ...cacheData, data: tunOffLove });

        localStorage.setItem("listVote", JSON.stringify(tunOffLove));

        onsubmitVote.mutate(
            { formData, id: data?.id },
            {
                onSuccess: ({ result, message }) => {
                    !data?.checked && toastCore.success(message);
                },
                onError: (error) => {
                    console.log("error", error);
                },
            }
        );
    };

    return { onClickVote };
};
