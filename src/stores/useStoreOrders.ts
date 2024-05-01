import { create } from "zustand";
import { OrderType } from "../types/OrderTypes";

type createOrdersStore = {
  orders: OrderType[];
  newOrder: OrderType;
  loadingOrders: boolean;
  setLoadingOrders: (loadingOrders: boolean) => void;
  addCustomer: (customerId: number) => void;
  resetNewOrder: () => void;
  cart: OrderedProduct[];
  addToCart: (product: OrderedProduct) => void;
};

type OrderedProduct = {
  product_type: "clothes" | "default";
  product_id: number;
  quantity: number;
  size_id?: number;
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
  cart: [],
  addToCart: (product: OrderedProduct) => {
    // Define the function that updates the store's state
    set((state) => {
      // Find the index of the product in the cart based on the product ID and (for clothes) the size
      const index = state.cart.findIndex(
        (item) =>
          item.product_id === product.product_id &&
          (product.product_type === "default" ||
            item.size_id === product.size_id)
      );

      // If the index is found (-1 means the product is not in the cart)
      if (index !== -1) {
        // Create a copy of the current cart
        const updatedCart = [...state.cart];

        // Update the quantity of the existing product by adding the new quantity
        updatedCart[index].quantity += product.quantity;

        // Return the new state of the store with the updated cart
        return { cart: updatedCart };
      } else {
        // If the product is not in the cart, add the new product to the cart
        return { cart: [...state.cart, product] };
      }
    });
  },
}));
