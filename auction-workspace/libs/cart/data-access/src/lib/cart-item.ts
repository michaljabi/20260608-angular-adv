import { AuctionItem } from '@auction-workspace/shared/domain';

/**
 * Agregat WYŁĄCZNIE kliencki (koszyk nigdy nie trafia na backend),
 * dlatego typ żyje tu, w `cart/data-access` — a nie w `shared/domain`
 * (zarezerwowanym dla kontraktu FE (front-end) <--> BE (back-end)).
 *
 * Promocja do `shared/domain`, dopiero gdy inna domena go potrzebuje lub koszyk pójdzie server-side.
 */
export interface CartItem extends AuctionItem {
  quantity: number;
}
