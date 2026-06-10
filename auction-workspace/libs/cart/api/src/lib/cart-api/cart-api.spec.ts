import { TestBed } from '@angular/core/testing';
import { AuctionItem } from '@auction-workspace/shared/domain';
import { CartStore } from '@auction-workspace/cart/data-access';
import { CartApi } from './cart-api';

describe('CartApi', () => {
  let api: CartApi;
  let store: CartStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    api = TestBed.inject(CartApi);
    store = TestBed.inject(CartStore);
  });

  it('should be created', () => {
    expect(api).toBeTruthy();
  });

  it('delegates add() to the cart store', () => {
    const item = {
      uid: 'a1',
      title: 'Test',
      imgUrl: 'https://example.com/x.png',
      price: 10,
      isPromoted: false,
    } satisfies AuctionItem;

    api.addAuction(item);

    expect(store.cartItems()).toHaveLength(1);
    expect(store.cartItems()[0].uid).toBe('a1');
  });
});
