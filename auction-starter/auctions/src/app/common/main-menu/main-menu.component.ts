import { Component, inject } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { CartService } from '../../cart/cart.service';

interface MenuItem {
  link: string;
  name: string;
}

@Component({
  selector: 'app-main-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    SharedModule
  ],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-3 mb-3">
      <button class="navbar-toggler" type="button" (click)="handleMenuToggle()">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" [class.show]="isMenuOpen">
        <ul class="navbar-nav">
          @for(item of menuItems; track item.link) {
            <li class="nav-item" routerLinkActive="active" >
              <a class="nav-link" [routerLink]="item.link" >{{item.name}}</a>
            </li>
          }
        </ul>
      </div>
      <div class="text-light">
        <a class="btn btn-primary mx-2" routerLink="/add-auction">
          <fa-icon icon="plus"></fa-icon> Dodaj
        </a>
        <a class="btn btn-secondary" routerLink="/cart">
          <fa-icon icon="shopping-basket"></fa-icon> Koszyk ({{ cartService.getItemsCount() }})
        </a>
      </div>
    </nav>
  `,
  styles: `
    li.active > a {
      color: #ff9900;
    }
  `
})
export class MainMenuComponent {

 cartService = inject(CartService);

  menuItems: MenuItem[] = [
    { link: '/auctions', name: 'Aukcje' },
    { link: '/promotions', name: 'Promocje' },
    { link: '/advices', name: 'Podpowiadamy'}
  ]
  isMenuOpen = false

  handleMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
