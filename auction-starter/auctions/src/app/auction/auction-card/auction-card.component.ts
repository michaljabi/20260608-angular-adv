import { Component, input, output } from '@angular/core';
import { AuctionItem } from '../auction-item';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-auction-card',
  imports: [SharedModule],
  template: `
    <div class="card">
      @let item = auction();
      <div class="card-header">{{ item.title }}</div>
      <img class="card-img" [src]="item.imgUrl" [alt]="item.title" />
      <div class="card-body">
        <p class="card-text">{{ item.description }}</p>
        <div class="d-flex justify-content-between align-content-center">
          @if (isPromoted()) {
            <span class="badge bg-warning text-dark mb-2 align-self-start">Promocja</span>
          }
          <strong> {{ item.price }} zł</strong>
          <button class="btn btn-primary" (click)="addToCart.emit(item)">
            <fa-icon icon="cart-plus"></fa-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class AuctionCardComponent {
  isPromoted = input<boolean>(false);
  auction = input.required<AuctionItem>();
  addToCart = output<AuctionItem>();
}
