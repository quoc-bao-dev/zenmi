import { create } from "zustand";

interface DialogWelcome {
    openDialogWelcome: boolean,
    setOpenDialogWelcome: (data: any) => void;
}


export const useDialogWelcome = create<DialogWelcome>((set) => {
    return {
        openDialogWelcome: true,
        setOpenDialogWelcome: (data: any) => set((state) => ({
            openDialogWelcome: data,
        })),
    }
});
