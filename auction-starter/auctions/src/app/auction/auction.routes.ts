import { Routes } from '@angular/router';
import { AuctionsPageComponent } from './auctions-page/auctions-page.component';
import { PromotionsPageComponent } from './promotions-page/promotions-page.component';
import { AddAuctionPageComponent } from './add-auction-page/add-auction-page.component';
import { CartPageComponent } from '../cart/cart-page/cart-page.component';
import { AddAuctionPageSignalComponent } from './add-auction-page/add-auction-page-signal.component';

export const auctionRoutes: Routes = [
  { path: 'auctions', component: AuctionsPageComponent },
  { path: 'promotions', component: PromotionsPageComponent },
  { path: 'add-auction', component: AddAuctionPageSignalComponent },
  { path: 'add-auction-no-signal', component: AddAuctionPageComponent },
  { path: 'cart', component: CartPageComponent },
];
