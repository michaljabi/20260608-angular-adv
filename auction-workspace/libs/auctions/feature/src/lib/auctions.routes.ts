import { Routes } from '@angular/router';
import { AuctionsPage } from './auctions-page/auctions-page';
import { PromotionsPage } from './promotions-page/promotions-page';
import { AddAuctionPage } from './add-auction-page/add-auction-page';

export const routes: Routes = [
  { path: '', component: AuctionsPage },
  { path: 'promotions', component: PromotionsPage },
  { path: 'add', component: AddAuctionPage },
];
