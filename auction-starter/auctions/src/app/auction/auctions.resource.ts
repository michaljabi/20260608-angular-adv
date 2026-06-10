import { computed, inject, Service } from '@angular/core';
import { AuctionItem } from './auction-item';
import { HttpClient, httpResource } from '@angular/common/http';

@Service()
export class AuctionsResource {
  readonly #auctionEnpoint = 'api/auctionst6';
  readonly #auctionResource = httpResource<AuctionItem[]>(() => this.#auctionEnpoint, {
    defaultValue: [],
  });

  httpClient = inject(HttpClient);

  all = computed(() => (this.#auctionResource.hasValue() ? this.#auctionResource.value() : []));

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
