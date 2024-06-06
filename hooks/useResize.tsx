import { create } from "zustand";

// resize responsive
interface ResizeStore {
    isVisibleMobile: boolean,
    isVisibleTablet: boolean,
    onResizeMobile: () => void
    onResizeTablet: () => void
    onCloseResizeMobile: () => void
    onCloseResizeTablet: () => void
}

export const useResize = create<ResizeStore>((set) => ({
    isVisibleMobile: false,
    isVisibleTablet: false,
    onResizeMobile: () => set({ isVisibleMobile: true }),
    onResizeTablet: () => set({ isVisibleTablet: true }),
    onCloseResizeMobile: () => set({ isVisibleMobile: false }),
    onCloseResizeTablet: () => set({ isVisibleTablet: false }),
}))