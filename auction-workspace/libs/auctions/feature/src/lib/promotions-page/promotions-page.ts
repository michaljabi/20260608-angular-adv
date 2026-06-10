import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuctionsResourceService } from '@auction-workspace/auctions/data-access';
import { AuctionCard } from '@auction-workspace/auctions/ui';
import { AuctionItem } from '@auction-workspace/shared/domain';
import { CartApi } from '@auction-workspace/cart/api';

/** Te same karty, ale zasób filtruje po `?isPromoted=true` (logika w data-access). */
@Component({
  selector: 'lib-promotions-page',
  imports: [AuctionCard, RouterLink],
  template: `
    <section>
      <h2>Nasze promocje</h2>
      <div class="row g-3">
        @if (promotions.error()) {
          <div class="col-12 alert alert-danger">Niestety wystąpił błąd…</div>
        }
        @if (promotions.isLoading()) {
          <div class="col-12 alert alert-info">Ładuję promocje…</div>
        }
        @for (a of promotions.value(); track a.uid) {
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <lib-auction-card [item]="a" (addToCart)="onAddToCart(a)" />
          </div>
        } @empty {
          @if (!promotions.isLoading()) {
            <div class="col-12 alert alert-warning">
              Brak aukcji promowanych.
            </div>
            <div class="col-12">
              <a class="btn btn-primary" routerLink="/auctions">
                Zobacz wszystkie aukcje
              </a>
            </div>
          }
        }
      </div>
    </section>
  `,
  styles: ``,
})
export class PromotionsPage {
  private readonly resource = inject(AuctionsResourceService);
  private readonly cartApi = inject(CartApi);
  protected readonly promotions = this.resource.getAllPromotions();

  protected onAddToCart(item: AuctionItem): void {
    this.cartApi.addAuction(item);
  }
}
