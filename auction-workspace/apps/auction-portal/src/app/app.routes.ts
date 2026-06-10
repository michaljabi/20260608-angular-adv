import { Route } from '@angular/router';
import { NotFoundPage } from '@auction-workspace/shared/ui';

export const appRoutes: Route[] = [
  // Tutaj strony FEATURE (e.g. /auctions, /promotions)
  // będą obsługiwały tzw. lazy loading.
  { path: '', redirectTo: '/auctions', pathMatch: 'full' },
  {
    path: 'auctions',
    loadChildren: () =>
      import('@auction-workspace/auctions/feature').then((m) => m.routes),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('@auction-workspace/cart/feature').then((m) => m.routes),
  },
  // wildcard — musi być ostatni, żeby nie "złapać" innego routingu
  { path: '**', component: NotFoundPage },
];
