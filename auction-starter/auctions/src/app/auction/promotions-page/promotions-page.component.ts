import { Component } from '@angular/core';
import { AuctionCardComponent } from '../auction-card/auction-card.component';
import { SharedModule } from '../../shared/shared.module';
import { AuctionItem } from '../auction-item';

@Component({
  imports: [AuctionCardComponent, SharedModule],
  template: `
    <h2 class="my-3">Aktualne promocje!</h2>

    <div class="row">
      @for (item of promotedAuctions; track item.uid) {
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <app-auction-card [auction]="item" />
        </div>
      } @empty {
        <div class="col-12">
          <div class="alert alert-info">Brak promocji...</div>
        </div>
      }
    </div>
  `
})
export class PromotionsPageComponent {
  promotedAuctions: AuctionItem[] = [];
}
