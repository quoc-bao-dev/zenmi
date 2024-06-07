
import { create } from 'zustand';

// data Detail Career
interface IStateHandbook {
    isStateHandbook: any;
    queryKeyIsStateHandbook: (key: any) => void;
}

export const useDataHandbook = create<IStateHandbook>((set) => ({
    isStateHandbook: {},
    queryKeyIsStateHandbook: (key: any) => set((state) => ({
        ...state,
        isStateHandbook: {
            ...state.isStateHandbook,
            ...key,
        },
    })),
}));
