import { AuctionItem } from '../auction/auction-item';

export interface CartItem extends AuctionItem {
  quantity: number;
}
