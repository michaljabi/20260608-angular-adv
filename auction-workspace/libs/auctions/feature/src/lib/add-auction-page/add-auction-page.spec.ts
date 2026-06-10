import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAuctionPage } from './add-auction-page';

describe('AddAuctionPage', () => {
  let component: AddAuctionPage;
  let fixture: ComponentFixture<AddAuctionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAuctionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAuctionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
