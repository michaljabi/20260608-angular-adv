import { Injectable } from '@angular/core';
import { AuctionItem } from '../auction/auction-item';
import { CartItem } from './cart-titem';

@Injectable({ providedIn: 'root' })
export class CartService {
  /**
   * Zadanie 4 - Poznajemy signals i signal-store
   * */

  private cartItems: CartItem[] = [];

  addAuction(auction: AuctionItem): void {
    const cartItem = this.cartItems.find((item) => item.uid === auction.uid);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cartItems.push({
        quantity: 1,
        ...auction,
      });
    }
  }

  getItems(): readonly CartItem[] {
    return this.cartItems;
  }

  getItemsCount(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  clear() {
    this.cartItems = [];
  }

  remove(uid: AuctionItem['uid']) {}
}
