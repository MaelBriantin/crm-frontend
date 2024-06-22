import { create } from "zustand";
import { OrderDetailsType } from "../types/OrderTypes.ts";
import { fetchOrderDetails } from "../services/api/orders/fetchOrderDetails.ts";
import { firstOf } from "../utils/helpers/spells.ts";
import { OrderDetails } from "../components/forms/OrderDetails.tsx";

type createOrderDetailStore = {
  orderDetails: OrderDetailsType | null;
  setOrderDetails: (id: OrderDetailsType["id"]) => void;
  resetOrderDetails: () => void;
  isOrderPaid: boolean;
  setIsOrderPaid: (isPaid: boolean) => void;
  loadingOrderDetails: boolean;
};

export const useStoreOrderDetails = create<createOrderDetailStore>((set) => ({
  loadingOrderDetails: false,
  orderDetails: null,
  resetOrderDetails: () => {
    set({ orderDetails: null });
  },
  setOrderDetails: (id: OrderDetailsType["id"]) => {
    set({ loadingOrderDetails: true });
    set({ isOrderPaid: false });
    fetchOrderDetails(id).then((orderDetails) => {
      set({ orderDetails: firstOf(orderDetails) });
      set({ loadingOrderDetails: false });
    });
  },
  isOrderPaid: false,
  setIsOrderPaid: (isPaid: boolean) => set({ isOrderPaid: isPaid }),
}));
