import { create } from "zustand";

interface ShopCart {
    carItems: any[];
    setCarItems: (data: any) => void;
}


export const useShopCart = create<ShopCart>((set) => {
    return {
        carItems: [],
        setCarItems: (data: any) => set((state) => ({
            carItems: data
        })),
    }
});
