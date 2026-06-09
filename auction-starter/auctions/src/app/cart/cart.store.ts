import { computed, Service, signal } from '@angular/core';
import { CartItem } from './cart-titem';
import { AuctionItem } from '../auction/auction-item';

@Service() // to to samo co @Injectable({ providedIn: 'root' }) "lukier składniowy"
export class CartStore {
  #cartItems = signal<CartItem[]>([]);

  cartItems = this.#cartItems.asReadonly();

  itemsCount = computed(() => this.#cartItems().reduce((acc, item) => acc + item.quantity, 0));

  addAuction(auction: AuctionItem): void {
    const items = this.#cartItems();
    const cartItem = items.find((item) => item.uid === auction.uid);
    // [{},{}, { uid: 'a' }]
    // dodaje  auction = { uid: 'a' }
    // [{}, {}, cartItem]
    if (cartItem) {
      // Functional way: (programowanie funkcyjne)
      /* 
      this.#cartItems.update((items) =>
        items.map((item) => {
          if (item === cartItem) {
            // mutujemy item 
            item.quantity++;
          }
          return item
        }),
      );
     */
      // Imperatywnie
      cartItem.quantity++;
      this.#cartItems.set([...items]); // musimy pamiętać o nowym obiekcie (shallow Copy)
      // this.#cartItems.set(items); // tak nie zadziała - bo obiekt nie jest "nowy", to ta sama referencja!
    } else {
      //   this.#cartItems().push({
      //     quantity: 1,
      //     ...auction,
      //   });

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      this.#cartItems.update((items) => [...items, { ...auction, quantity: 1 }]);
    }
  }

  clear() {
    this.#cartItems.set([]);
  }

  // zostanie:
  remove(uid: AuctionItem['uid']) {
    this.#cartItems.update((items) => items.filter(i => i.uid !== uid));
  }
}

