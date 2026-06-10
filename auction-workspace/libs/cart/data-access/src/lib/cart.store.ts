import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import {
  addEntity,
  entityConfig,
  removeAllEntities,
  removeEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { AuctionItem } from '@auction-workspace/shared/domain';
import { CartItem } from './cart-item';

const itemConfig = entityConfig({
  entity: type<CartItem>(),
  collection: 'cartItems',
  selectId: (ci) => ci.uid,
});

export const CartStore = signalStore(
  { providedIn: 'root' },
  withEntities(itemConfig),
  withComputed(({ cartItemsEntities }) => ({
    itemsCount: computed(() =>
      cartItemsEntities().reduce((sum, item) => sum + item.quantity, 0),
    ),
    priceTotal: computed(() =>
      cartItemsEntities().reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    ),
    cartItems: cartItemsEntities,
  })),
  withMethods((store) => ({
    addAuction(auction: AuctionItem): void {
      const cartItem = store.cartItemsEntityMap()[auction.uid];
      if (cartItem) {
        patchState(
          store,
          updateEntity(
            {
              id: auction.uid,
              changes: (ci) => ({ quantity: ci.quantity + 1 }),
            },
            itemConfig,
          ),
        );
      } else {
        patchState(store, addEntity({ ...auction, quantity: 1 }, itemConfig));
      }
    },
    remove(uid: string): void {
      patchState(store, removeEntity(uid, itemConfig));
    },
    clear(): void {
      patchState(store, removeAllEntities(itemConfig));
    },
  })),
);
