import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { AuctionItem } from '../../auction/auction-item';
import { CartItem } from '../cart-titem';

@Component({
  selector: 'tr[app-cart-row]',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <td>
      <img
        [src]="item().imgUrl"
        [alt]="item().title"
        width="56"
        height="56"
        class="rounded object-fit-cover"
      />
    </td>
    <td>{{ item().title }}</td>
    <td class="text-end">{{ item().price }} zł</td>
    <td class="text-center">{{ item().quantity }}</td>
    <td class="text-end">{{ total() }} zł</td>
    <td class="text-end">
      <button
        type="button"
        class="btn btn-sm btn-outline-danger"
        (click)="remove.emit(item().uid)"
      >
        Usuń
      </button>
    </td>
  `,
  styles: ``,
})
export class CartRowComponent {
  readonly item = input.required<CartItem>();
  readonly remove = output<AuctionItem['uid']>();

  protected readonly total = computed(() => this.item().price * this.item().quantity);
}
