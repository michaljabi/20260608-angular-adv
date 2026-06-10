import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartStore } from '@auction-workspace/cart/data-access';

/**
 * Strona smart: wstrzykuje `CartStore` i renderuje jego dane z sygnałów.
 */
@Component({
  selector: 'lib-cart-page',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <h2>Twój koszyk</h2>

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
              <tr>
                <td>
                  <img
                    [src]="item.imgUrl"
                    [alt]="item.title"
                    width="56"
                    height="56"
                    class="rounded object-fit-cover"
                  />
                </td>
                <td>{{ item.title }}</td>
                <td class="text-end">{{ item.price }} zł</td>
                <td class="text-center">{{ item.quantity }}</td>
                <td class="text-end">{{ item.price * item.quantity }} zł</td>
                <td class="text-end">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-danger"
                    (click)="cartStore.remove(item.uid)"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <th colspan="4" class="text-end">
                Razem ({{ cartStore.itemsCount() }}):
              </th>
              <th class="text-end">{{ cartStore.priceTotal() }} zł</th>
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
export class CartPage {
  protected readonly cartStore = inject(CartStore);
}
