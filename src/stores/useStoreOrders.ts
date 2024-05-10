import { create } from "zustand";
import { OrderOptionsType, OrderType } from "../types/OrderTypes";
import { ProductSizeType } from "../types/ProductTypes";
import { firstOf, sortBy } from "../utils/helpers/spells.ts";
import { fetchAllOrderOptions } from "../services/api/orders";

type createOrdersStore = {
  orders: OrderType[];
  newOrder: OrderType;
  paymentMethods: { label: string; value: string }[];
  orderOptions: OrderOptionsType;
  loadingOrderOptions: boolean;
  fetchOrderOptions: () => void;
  loadingOrders: boolean;
  setLoadingOrders: (loadingOrders: boolean) => void;
  addCustomer: (customerId: number) => void;
  resetNewOrder: () => void;
  cart: OrderedProduct[];
  addToCart: (product: OrderedProduct) => void;
  resetCart: () => void;
  updateCartQuantity: (
    product_id: number,
    size_id: number | null,
    quantity: number
  ) => void;
  removeFromCart: (productId: number, sizeId: number | null) => void;
};

export type OrderedProduct = {
  product_type: "clothes" | "default";
  product_id: number;
  ordered_quantity: number;
  size?: ProductSizeType;
  product_size_id?: number;
};

export const useStoreOrders = create<createOrdersStore>((set) => ({
  orders: [],
  paymentMethods: [],
  orderOptions: {} as OrderOptionsType,
  loadingOrderOptions: false,
  fetchOrderOptions: async () => {
    set({ loadingOrderOptions: true });
    const response = await fetchAllOrderOptions();
    set({ orderOptions: firstOf(response) as OrderOptionsType });
    set({
      paymentMethods: convertOrderOptions(
        firstOf(response) as OrderOptionsType
      ),
    });
    set({ loadingOrderOptions: false });
  },
  newOrder: {} as OrderType,
  loadingOrders: false,
  setLoadingOrders: (loadingOrders: boolean) => set({ loadingOrders }),
  addCustomer: (customerId: number) =>
    set((state) => ({
      newOrder: { ...state.newOrder, customer_id: customerId },
    })),
  resetNewOrder: () => set({ newOrder: {} as OrderType }),
  cart: [],
  addToCart: (product: OrderedProduct) => {
    set((state) => {
      const index = state.cart.findIndex(
        (item) =>
          item.product_id === product.product_id &&
          (product.product_type === "default" || item.size === product.size)
      );

      if (index !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[index].ordered_quantity += product.ordered_quantity;
        return { cart: sortBy(updatedCart, "product_id") };
      } else {
        const newProduct = { ...product };
        if (product.product_type === "clothes" && product.size) {
          newProduct.product_size_id = Number(product.size.id);
        }
        const newCart = [...state.cart, newProduct];
        return { cart: sortBy(newCart, "product_id") };
      }
    });
  },
  resetCart: () => set({ cart: [] }),
  updateCartQuantity: (
    product_id: number,
    size_id: number | null,
    ordered_quantity: number
  ) => {
    set((state) => {
      if (size_id) {
        const index = state.cart.findIndex(
          (item) => item.product_id === product_id && item.size?.id === size_id
        );
        if (index !== -1) {
          const updatedCart = [...state.cart];
          updatedCart[index].ordered_quantity = ordered_quantity;
          return { cart: updatedCart };
        }
      } else {
        const index = state.cart.findIndex(
          (item) => item.product_id === product_id
        );
        if (index !== -1) {
          const updatedCart = [...state.cart];
          updatedCart[index].ordered_quantity = ordered_quantity;
          return { cart: updatedCart };
        }
      }
      return state;
    });
  },
  removeFromCart: (productId: number, sizeId: number | null) => {
    set((state) => {
      if (sizeId) {
        const updatedCart = state.cart.filter(
          (item) => item.product_id !== productId || item.size?.id !== sizeId
        );
        return { cart: updatedCart };
      } else {
        const updatedCart = state.cart.filter(
          (item) => item.product_id !== productId
        );
        return { cart: updatedCart };
      }
    });
  },
}));

const convertOrderOptions = (orderOptions: OrderOptionsType) => {
  const orderOptionDropdown: { label: string; value: string }[] = [];
  Object.entries(orderOptions.payment_methods).map(([key, value]) => {
    orderOptionDropdown.push({ label: key, value: String(value) });
  });

  return orderOptionDropdown;
};
