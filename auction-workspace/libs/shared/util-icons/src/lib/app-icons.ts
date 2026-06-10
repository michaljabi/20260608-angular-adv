import {
  faSolidPlus,
  faSolidBasketShopping,
  faSolidCartPlus,
  faSolidMagnifyingGlass,
} from '@ng-icons/font-awesome/solid';

/**
 * Katalog ikon dla całego workspace
 * (`type:util`, `scope:shared` — najniższa warstwa, dostępna dla wszystkich).
 *
 * Zasady (NIE łam ich — to one dają korzyści tej biblioteki):
 * - Komponenty rejestrują TYLKO to, czego potrzebują, przez component-scoped np.
 *   `viewProviders: [provideIcons({ add: appIcons.add })]`.
 *
 *   Dzięki temu komponent
 *   jest samowystarczalny i BEZPIECZNY dla Angular Elements (custom element nie ma
 *   root-injectora — providery muszą podróżować z komponentem), a tree-shaking
 *   działa per-komponent (element pakuje tylko swoje ikony).
 *
 * - Nazwa w `name="..."` szablonu w <ng-icon name="..."> to klucz użyty w `provideIcons({ <klucz>: ... })`.
 */
export const appIcons = {
  plus: faSolidPlus,
  basketShopping: faSolidBasketShopping,
  cartPlus: faSolidCartPlus,
  search: faSolidMagnifyingGlass,
} as const;

// Publiczne nazwy używanych ikon
// (na razie nie importowane, ale może się potencjalnie przydać, aby TS wiedział, jakie ma dostępne ikony)
export type AppIconName = keyof typeof appIcons;
