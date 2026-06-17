import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Item {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    image_url: string;
    category_id: string;
    brand_id: string;
}

export interface CartItem {
    product: Item;
    quantity: number;
}

interface CartState {
    items: CartItem[];

    addToCart: (item: Item) => void;
    clearCart: () => void;
    updateQuantity: (slug: string, action: 'increase' | 'decrease') => void;
    removeFromCart: (slug: string) => void;
}

export const useCartStore = create<CartState>()(
    devtools(
        persist(
            (set) => ({
                items: [],

                addToCart: (productToAdd) => {
                    set((state) => {
                        const existingItem = state.items.find(
                            (item) => item.product.slug === productToAdd.slug
                        );

                        if (existingItem) {
                            const updatedItems = state.items.map((item) =>
                                item.product.slug === productToAdd.slug
                                ? {...item, quantity: item.quantity + 1}
                                : item    
                            );
                            return { items: updatedItems}
                        }

                        return { items: [...state.items, {product: productToAdd, quantity: 1}]}
                    }, false, 'cart/addToCart');
                },
                clearCart: () => {
                    set({ items: [] }, false, 'cart/clearCart');
                },

                updateQuantity: (slug, action) => {
                    set((state) => {
                        const updatedItems = state.items.map((item) => {
                            if (item.product.slug === slug) {
                                const newQuantity = action === 'increase'
                                    ? item.quantity + 1
                                    : item.quantity - 1;
                                return { ...item, quantity: newQuantity}
                            }
                            return item;
                        })
                            .filter((item) => item.quantity > 0);

                        return { items: updatedItems}
                    }, false, `cart/updateQuanity_${action}`);
                },

                removeFromCart: (slug) => {
                    set((state) => ({
                        items: state.items.filter((item) => item.product.slug !== slug)
                    }), false, 'cart/removeFromCart');
                }
            })
            , { name: 'cartStore' })
    )
)