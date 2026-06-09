import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { CartItem } from './cart-titem';
import { AuctionItem } from '../auction/auction-item';
import { computed } from '@angular/core';

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const CartNgrxStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    itemsCount: computed(() => store.cartItems().reduce((acc, item) => acc + item.quantity, 0)),
  })),
  withMethods((store) => ({
    addAuction: (auction: AuctionItem) => {
      // to nie jest do końca 100% funkcyjne podejście  
      const items = store.cartItems();
      const cartItem = items.find((item) => item.uid === auction.uid);
      if (cartItem) {
        // tutaj mutuje:
        cartItem.quantity++;
        // tutaj korzystam z tego że robię "shallow copy"
        patchState(store, () => ({ cartItems: [...items] }));
      } else {
        patchState(store, () => ({ cartItems: [...items, { ...auction, quantity: 1 }] }));
      }
    },
    clear: () => {
      patchState(store, (state) => ({ cartItems: [] }));
    },
    remove: (uid: AuctionItem['uid']) => {
      patchState(store, (state) => ({ cartItems: state.cartItems.filter((i) => i.uid !== uid) }));
    },
  })),
);
