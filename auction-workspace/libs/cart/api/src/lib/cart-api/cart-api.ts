import { inject, Injectable } from '@angular/core';
import { AuctionItem } from '@auction-workspace/shared/domain';
import { CartStore } from '@auction-workspace/cart/data-access';

/**
 * Publiczne API domeny `cart` (od Steyer: lib `type:api` = jedyne wrota do domeny).
 *
 * Fasada nad `CartStore`:
 *
 * odsłania INNYM domenom tylko metodę `addAuction` oraz odczyt `itemsCount`,
 *
 * wewnętrzne `remove`/`clear`/etc. pozostają prywatne dla domeny koszyka.
 */
@Injectable({
  providedIn: 'root',
})
export class CartApi {
  #store = inject(CartStore);
  itemsCount = this.#store.itemsCount;

  /** Dodaje aukcję do koszyka (jedyna operacja cross-domain). */
  addAuction(item: AuctionItem): void {
    this.#store.addAuction(item);
  }
}
