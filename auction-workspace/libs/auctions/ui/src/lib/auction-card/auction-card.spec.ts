import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuctionItem } from '@auction-workspace/shared/domain';
import { AuctionCard } from './auction-card';

const mockItem: AuctionItem = {
  uid: '1',
  title: 'Test item',
  description: 'desc',
  imgUrl: 'https://example.com/x.jpg',
  price: 100,
  isPromoted: false,
};

describe('AuctionCard', () => {
  let component: AuctionCard;
  let fixture: ComponentFixture<AuctionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionCard);
    component = fixture.componentInstance;
    // Required signal input musi być wypełniony zanim uruchomi się change detection.
    fixture.componentRef.setInput('item', mockItem);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the item on add to cart', () => {
    let emitted: AuctionItem | undefined;
    component.addToCart.subscribe((i) => (emitted = i));

    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitted).toEqual(mockItem);
  });
});
