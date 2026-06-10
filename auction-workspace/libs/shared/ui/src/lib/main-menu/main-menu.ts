import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { appIcons } from '@auction-workspace/shared/util-icons';
import { MenuItem } from './menu-item';

/**
 * Komponent ten, pomimo domeny `shared` nie nadaje się do eksportu jako `custom` (auction-elements)!
 *
 * zależy od `RouterLink` z `@angular/router`.
 *
 * Custom element rejestrowany przez `createCustomElement` działa POZA drzewem routingu hosta
 * — nie ma routera ani `<router-outlet>`, więc `[routerLink]` nie zadziała
 * (a w innym frameworku, np. Vue, router Angulara w ogóle nie istnieje).
 *
 * Komponent gotowy do Angular Elements musi być "samowystarczalny": tylko
 * `input()`/`output()`, bez wiedzy o routingu — nawigację oddaje hostowi przez
 * `output<string>()` (np. `navigate`), a host decyduje co z nią zrobić.
 * Ten MainMenu świadomie wybiera `RouterLink` (prostsza integracja wewnątrz
 * monorepo), więc zostaje zwykłym, współdzielonym komponentem `shared/ui`
 * sprzęgniętym z routerem — wielokrotnego użytku TYLKO w aplikacjach Angulara
 * z routerem.
 */
@Component({
  selector: 'lib-main-menu',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  // Ikony rejestrowane component-scoped (nie w root): komponent samowystarczalny,
  // a `name="add"`/`name="cart"` = klucze z `provideIcons`. Tree-shaking per-komponent.
  viewProviders: [
    provideIcons({ add: appIcons.plus, cart: appIcons.basketShopping }),
  ],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-3 mb-3">
      <button
        class="navbar-toggler"
        type="button"
        (click)="isMenuOpen.update(open => !open)"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" [class.show]="isMenuOpen()">
        <ul class="navbar-nav">
          @for (item of menuItems(); track item.link) {
            <li class="nav-item" routerLinkActive="active">
              <a class="nav-link" [routerLink]="item.link">{{ item.name }}</a>
            </li>
          }
        </ul>
      </div>
      <div class="text-light">
        <a class="btn btn-primary mx-2" routerLink="/auctions/add">
          <ng-icon name="add" /> Dodaj
        </a>
        <a class="btn btn-secondary" routerLink="/cart">
          <ng-icon name="cart" /> Koszyk ({{ cartItemsCount() }})
        </a>
      </div>
    </nav>
  `,
})
export class MainMenu {
  menuItems = input<MenuItem[]>([]);

  cartItemsCount = input<number>(0);

  protected isMenuOpen = signal(false);
}
