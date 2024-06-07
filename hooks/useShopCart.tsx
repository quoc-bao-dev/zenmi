import { create } from "zustand";

interface ShopCart {
    carItems: any[];
    setCarItems: (data: any) => void;
    dataDetail: any;
    setDataDetail: (data: any) => void;
}


export const useShopCart = create<ShopCart>((set) => {
    return {
        carItems: [],
        dataDetail: {},
        setCarItems: (data: any) => set((state) => ({
            carItems: data
        })),
        setDataDetail: (data: any) => set((state) => ({
            dataDetail: data
        })),
    }
});
