import { create } from "zustand";

interface ShopCart {
    carItems: any[];
    setCarItems: (data: any) => void;
}

export const useShopCart = create<ShopCart>((set) => ({
    carItems: localStorage.getItem('carItems') ? JSON.parse(localStorage.getItem('carItems')!) : [],
    setCarItems: (data: any) => set((state) => ({
        carItems: data
    })),
}));
