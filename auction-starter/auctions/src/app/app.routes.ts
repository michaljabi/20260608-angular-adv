import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './common/not-found-page/not-found-page.component';
import { auctionRoutes } from './auction/auction.routes';
import { cartRoutes } from './cart/cart.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/auctions', pathMatch: 'full' },
  ...auctionRoutes,
  ...cartRoutes,
  { path: 'advices', loadChildren: () => import('./advice/advice.routes').then((m) => m.routes) },
  { path: '**', component: NotFoundPageComponent },
];
