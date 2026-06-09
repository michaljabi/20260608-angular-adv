import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartRowComponent } from './cart-row.component';
import { CartStore } from '../cart.store';
import { CartNgrxStore } from '../cart.ngrx-store';

@Component({
  imports: [CartRowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <h2 class="my-3">Twój koszyk</h2>

      @if (cartStore.itemsCount()) {
        <table class="table align-middle">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Aukcja</th>
              <th scope="col" class="text-end">Cena</th>
              <th scope="col" class="text-center">Ilość</th>
              <th scope="col" class="text-end">Suma</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            @for (item of cartStore.cartItems(); track item.uid) {
              <tr app-cart-row [item]="item" (remove)="cartStore.remove($event)"></tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <th colspan="4" class="text-end">Razem ({{ cartStore.itemsCount() }}):</th>
              <th class="text-end">{{ 0 }} zł</th>
              <th class="text-end">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                  (click)="cartStore.clear()"
                >
                  Wyczyść
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      } @else {
        <div class="alert alert-info">Koszyk jest pusty.</div>
      }
    </section>
  `,
  styles: ``,
})
export class CartPageComponent {
  protected readonly cartStore = inject(CartNgrxStore);
}
