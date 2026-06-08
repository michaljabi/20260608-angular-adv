import { Injectable } from '@angular/core';
import { AuctionItem } from '../auction/auction-item';
import { CartItem } from './cart-titem';

/**
 * ng g s cart --type="store"
 * 
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  
  // Typescript way:
  // private cartItems: CartItem[] = [];
  
  // JavaScript (nowadays way) - to samo co wyżej ale zapis mamy zawsze z #
  // taki zapis _cartItems - to tylko konwencja !!!
  // na sygnał przerabiamy:
  #cartItems: CartItem[] = [];

  // zostanie:
  addAuction(auction: AuctionItem): void {
    const cartItem = this.#cartItems.find((item) => item.uid === auction.uid);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.#cartItems.push({
        quantity: 1,
        ...auction,
      });
    }
  }

  // przerabiamy na sygnał .asReadonly()
  getItems(): readonly CartItem[] {
    return this.#cartItems;
  }

  // przerabiamy na sygnał computed() !
  getItemsCount(): number {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    return this.#cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  // zostanie:
  clear() {
    this.#cartItems = [];
  }

  // zostanie:
  remove(uid: AuctionItem['uid']) {}
}

// const myCartInstance = new CartService();

// myCartInstance.getItems().push({} as CartItem);