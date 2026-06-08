type Money = number;

export interface AuctionItem {
  uid: string;
  title: string;
  imgUrl: string;
  price: Money;
  description?: string;
}

// Koncepcja na przyszłość...
interface PromotedAuctionItem extends AuctionItem {
  // id: string;
  // title: string;
  // imgUrl: string;
  // price: Money;
  isOnPromotion: boolean;
  // description?: string;
}
