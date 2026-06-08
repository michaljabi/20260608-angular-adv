type Money = number;

export interface AuctionItem {
  uid: string;
  title: string;
  imgUrl: string;
  price: Money;
  description?: string;
}

export interface PromotedAuctionItem extends AuctionItem {
  isPromoted: boolean;
}
