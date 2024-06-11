import { create } from "zustand";

interface Alert {
    openAlert: boolean,
    titleAlert?: string,
    contentAlert?: string,
    type?: any
    setOpenAlert: (data: any, titleAlert?: string, contentAlert?: string, type?: any) => void;
}


export const useAlert = create<Alert>((set) => {
    return {
        openAlert: false,
        type: null,
        setOpenAlert: (data: any, titleAlert?: string, contentAlert?: string, type?: any) => set((state) => ({
            openAlert: data,
            titleAlert: titleAlert,
            contentAlert: contentAlert,
            type: type
        })),
    }
});
