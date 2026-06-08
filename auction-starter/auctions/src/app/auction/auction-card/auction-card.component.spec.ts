import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCardComponent } from './auction-card.component';
import { AuctionItem } from '../auction-item';

const mockAuction: AuctionItem = {
  uid: '1',
  title: 'Test item',
  description: 'desc',
  imgUrl: 'https://example.com/x.jpg',
  price: 100,
};

describe('AuctionCardComponent', () => {
  let component: AuctionCardComponent;
  let fixture: ComponentFixture<AuctionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('auction', mockAuction);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
