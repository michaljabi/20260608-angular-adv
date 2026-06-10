import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header, MainMenu } from '@auction-workspace/shared/ui';
import { CartApi } from '@auction-workspace/cart/api';

@Component({
  imports: [RouterModule, Header, MainMenu],
  selector: 'app-root',
  template: `
    <lib-header />
    <main class="container">
      <lib-main-menu
        [menuItems]="[
          { name: 'Aukcje', link: '/auctions' },
          { name: 'Promocje', link: '/auctions/promotions' },
        ]"
        [cartItemsCount]="cartApi.itemsCount()"
      />
      <router-outlet></router-outlet>
    </main>
  `,
})
export class App {
  protected readonly cartApi = inject(CartApi);
}
