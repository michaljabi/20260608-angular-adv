import { inject, Service } from '@angular/core';
import { AuctionItem } from './auction-item';
import { HttpClient, httpResource } from '@angular/common/http';

@Service()
export class AuctionsResource {
  readonly #auctionEnpoint = 'api/auctions';
  readonly #auctionResource = httpResource<AuctionItem[]>(() => this.#auctionEnpoint, {
    defaultValue: [],
  });

  httpClient = inject(HttpClient);

  get all() {
    return this.#auctionResource.value;
  }

  get isLoading() {
    return this.#auctionResource.isLoading;
  }

  get error() {
    return this.#auctionResource.error;
  }

  reloadAuctions(): void {
    this.#auctionResource.reload();
  }

  addNew(idLessItem: Omit<AuctionItem, 'uid'>) {
    return this.httpClient.post<AuctionItem>(this.#auctionEnpoint, idLessItem).pipe();
  }
}
