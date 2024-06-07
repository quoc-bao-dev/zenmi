import { create } from "zustand";

interface Alert {
    openAlert: boolean,
    titleAlert?: string,
    contentAlert?: string,
    setOpenAlert: (data: any, titleAlert?: string, contentAlert?: string) => void;
}


export const useAlert = create<Alert>((set) => {
    return {
        openAlert: false,
        setOpenAlert: (data: any, titleAlert?: string, contentAlert?: string) => set((state) => ({
            openAlert: data,
            titleAlert: titleAlert,
            contentAlert: contentAlert
        })),
    }
});
