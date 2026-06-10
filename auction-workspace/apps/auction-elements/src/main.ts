import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { provideZonelessChangeDetection, Type } from '@angular/core';
import { AddAuctionWizard, AuctionCard } from '@auction-workspace/auctions/ui'; // ponowne użycie bibliotek — jedno źródło prawdy w (auctions/ui)

/**
 * Host elementów: opakowuje istniejące komponenty bibliotek jako standardowe custom elements.
 * JEDEN `createApplication()` → JEDEN współdzielony runtime/injector Angulara dla WSZYSTKICH elementów
 * (nigdy nie wywołuj go per-element — to dostarczyłoby N kopii runtime'u).
 * Zoneless, aby nie zaśmiecać strony hosta przez Zone.js.
 *
 * Każdy komponent musi spełniać warunki: bez routera, sterowany `input()`/`output()`, z DI
 * na poziomie komponentu, bez data-access. Wejścia obiekt/tablica ustawiane jako *właściwości* DOM; `output()` → CustomEvent.
 * Tag MUSI zawierać myślnik i być unikalny.
 */
const ELEMENTS: ReadonlyArray<readonly [string, Type<unknown>]> = [
  ['auction-add-wizard', AddAuctionWizard], // output: completed
  ['auction-card', AuctionCard], // input: item (set as property); output: addToCart
];

(async () => {
  const app = await createApplication({
    providers: [provideZonelessChangeDetection()],
  });
  for (const [tag, component] of ELEMENTS) {
    customElements.define(
      tag,
      createCustomElement(component, { injector: app.injector }),
    );
  }
})();
