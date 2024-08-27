import { toastHotCore } from "@/lib/hot-toast";
import { postArrayVote, postVote } from "@/services/Vote/vote.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useVote = (param: any) => {
    const formData = new FormData();

    const queryClient = useQueryClient();

    const cacheData = queryClient.getQueryData(["api_list_vote", param]) as any;

    const onsubmitVote = useMutation({
        mutationFn: async ({ formData }: any) => {
            const { data } = await postArrayVote(param, formData);
            return data;
        },
    });

    const onClickVote = async (data: any) => {
        const tunOffLove = cacheData?.data?.map((x: any) => ({
            ...x,
            checked: x?.id == data?.id ? !x?.checked : x?.checked,
        }));

        queryClient.setQueryData(["api_list_vote", param], { ...cacheData, data: tunOffLove });

        localStorage.setItem("listVote", JSON.stringify(tunOffLove));
    };

    const onSubmitArrayVote = () => {
        cacheData?.data?.forEach((x: any, index: any) => {
            if (x?.checked) {
                formData.append(`list_id[${index}]`, x?.id);
            }
        });
        onsubmitVote.mutate(
            { formData },
            {
                onSuccess: ({ result, message }) => {
                    if (!result) {
                        toastHotCore.error(message);
                        return;
                    }
                    toastHotCore.success(message);
                },
                onError: (error) => {
                    console.log("error", error);
                },
            }
        );
    };

    return { onClickVote, onSubmitArrayVote };
};
