import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuctionsResourceService } from '@auction-workspace/auctions/data-access';
import { AuctionCard } from '@auction-workspace/auctions/ui';
import { AuctionItem } from '@auction-workspace/shared/domain';
import { CartApi } from '@auction-workspace/cart/api';

@Component({
  selector: 'lib-auctions-page',
  imports: [AuctionCard, RouterLink],
  template: `
    <section>
      <h2>Lista naszych aukcji</h2>
      <div class="row g-3">
        @if (auctions.error()) {
          <div class="col-12 alert alert-danger">Niestety wystąpił błąd…</div>
        }
        @if (auctions.isLoading()) {
          <div class="col-12 alert alert-info">Ładuję aukcje…</div>
        }
        @for (a of auctions.value(); track a.uid) {
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <lib-auction-card [item]="a" (addToCart)="onAddToCart(a)" />
          </div>
        } @empty {
          @if (!auctions.isLoading()) {
            <div class="col-12 alert alert-warning">
              Nie ma jeszcze żadnych aukcji :(
            </div>
            <div class="col-12">
              <a class="btn btn-primary" routerLink="/auctions/add">
                Dodaj pierwszą aukcję
              </a>
            </div>
          }
        }
      </div>
    </section>
  `,
  styles: ``,
})
export class AuctionsPage {
  searchText = signal('');
  private readonly resource = inject(AuctionsResourceService);
  private readonly cartApi = inject(CartApi);
  protected readonly auctions = this.resource.getAll();

  protected onAddToCart(item: AuctionItem): void {
    this.cartApi.addAuction(item);
  }
}
