import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartStore } from '@auction-workspace/cart/data-access';
import { AuctionItem } from '@auction-workspace/shared/domain';
import { CartPage } from './cart-page';

const auction = (uid: string, price: number): AuctionItem => ({
  uid,
  title: `Aukcja ${uid}`,
  imgUrl: 'https://example.com/x.png',
  price,
  isPromoted: false,
});

describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;
  let store: CartStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    store = TestBed.inject(CartStore);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows an empty-cart message when there are no items', () => {
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Koszyk jest pusty');
    expect(fixture.nativeElement.querySelector('table')).toBeNull();
  });

  it('renders a row per item with line total and the grand total', () => {
    store.addAuction(auction('a', 10));
    store.addAuction(auction('a', 10));
    store.addAuction(auction('b', 5));
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(2);

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('20 zł'); // line total for a (10 * 2)
    expect(text).toContain('25 zł'); // grand total
  });

  it('removes a line when its remove button is clicked', () => {
    store.addAuction(auction('a', 10));
    fixture.detectChanges();

    fixture.nativeElement
      .querySelector('tbody tr button')
      .click();
    fixture.detectChanges();

    expect(store.cartItems()).toEqual([]);
    expect(fixture.nativeElement.textContent).toContain('Koszyk jest pusty');
  });
});