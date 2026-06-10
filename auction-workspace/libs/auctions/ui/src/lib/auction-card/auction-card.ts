import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { AuctionItem } from '@auction-workspace/shared/domain';
import { appIcons } from '@auction-workspace/shared/util-icons';


import { AuctionsResourceService } from '@auction-workspace/auctions/data-access';

/**
 * Komponent prezentacyjny (dumb): tylko `input()`/`output()`, brak DI serwisów,
 * brak HttpClient — łatwy do testów i wielokrotnego użycia (także w koszyku).
 *
 * Jest naszym kandydatem do auction-elements.
 * Projektu budującego się jako standalone WebComponents, do użycia w innych frameworkach (Vue, React)
 * lub nawet bez frameworka w czystym (valinlla) JS + HTML.
 */
@Component({
  selector: 'lib-auction-card',
  imports: [NgIcon],
  // Ikona rejestrowana component-scoped — element pakuje TYLKO `add` (tree-shaking),
  // i działa jako Angular Element (brak root-injectora). Patrz shared/util-icons.
  viewProviders: [provideIcons({ cartPlus: appIcons.cartPlus })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let a = item();
    <div class="card h-100">
      <div class="card-header text-truncate">{{ a.title }}</div>
      <img class="card-img-top" [src]="a.imgUrl" [alt]="a.title" />
      <div class="card-body d-flex flex-column">
        @if (a.isPromoted) {
          <span class="badge bg-warning text-dark mb-2 align-self-start"
            >Promocja</span
          >
        }
        <p class="card-text flex-grow-1">{{ a.description }}</p>
        <div class="d-flex justify-content-between align-items-center">
          <strong>{{ a.price }} zł</strong>
          <button
            class="btn btn-primary"
            type="button"
            (click)="addToCart.emit(a)"
          >
            <ng-icon name="cartPlus" />
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class AuctionCard {
  item = input.required<AuctionItem>();
  addToCart = output<AuctionItem>();
}
