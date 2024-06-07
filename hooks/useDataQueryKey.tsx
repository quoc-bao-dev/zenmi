
import { create } from 'zustand';

// data Detail Career
interface IStateHandbook {
    isStateHandbook: any;
    queryKeyIsStateHandbook: (key: any) => void;
}

export const useDataHandbook = create<IStateHandbook>((set) => ({
    isStateHandbook: {
        dataListHandbook: [],
        dataDetailHandbook: [],
        detailHandbook: undefined
    },
    queryKeyIsStateHandbook: (key: any) => set((state) => ({
        ...state,
        isStateHandbook: {
            ...state.isStateHandbook,
            ...key,
        },
    })),
}));
