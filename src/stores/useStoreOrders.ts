import { create } from "zustand";
import { OrderType } from "../types/OrderTypes";

type createOrdersStore = {
  orders: OrderType[];
  newOrder: OrderType;
  loadingOrders: boolean;
  setLoadingOrders: (loadingOrders: boolean) => void;
  addCustomer: (customerId: number) => void;
  resetNewOrder: () => void;
};

export const useStoreOrders = create<createOrdersStore>((set) => ({
  orders: [],
  newOrder: {} as OrderType,
  loadingOrders: false,
  setLoadingOrders: (loadingOrders: boolean) => set({ loadingOrders }),
  addCustomer: (customerId: number) =>
    set((state) => ({
      newOrder: { ...state.newOrder, customer_id: customerId },
    })),
  resetNewOrder: () => set({ newOrder: {} as OrderType }),
}));
