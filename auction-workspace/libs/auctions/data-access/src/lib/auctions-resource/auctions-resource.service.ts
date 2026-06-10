import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import {
  AuctionItem,
  AuctionItemWithoutUid,
} from '@auction-workspace/shared/domain';

/**
 * Jedyna warstwa, która wie o backendzie.
 * UI nigdy nie dotyka `HttpClient` czy `httpResource()` !!!.
 *
 * Wołamy WZGLĘDNY `/api/auctions` — dev-proxy portalu przekierowuje na :3200.
 */
@Injectable({ providedIn: 'root' })
export class AuctionsResourceService {
  #endpoint = '/api/auctions';
  #httpClient = inject(HttpClient);

  // Reaktywny zasób z pełną listą aukcji (loading/error/value w sygnałach).
  getAll() {
    return httpResource<AuctionItem[]>(() => this.#endpoint, {
      defaultValue: [],
    });
  }

  // Reaktywny zasób tylko z aukcjami promowanymi (`?isPromoted=true`).
  getAllPromotions() {
    return httpResource<AuctionItem[]>(
      () => ({ url: this.#endpoint, params: { isPromoted: true } }),
      { defaultValue: [] },
    );
  }

  // {POST} dodanie aukcji — backend nada `uid`.
  addOne(newAuction: AuctionItemWithoutUid) {
    return this.#httpClient.post<AuctionItem>(this.#endpoint, newAuction);
  }
}
