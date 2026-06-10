import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PromotionsPage } from './promotions-page';

describe('PromotionsPage', () => {
  let component: PromotionsPage;
  let fixture: ComponentFixture<PromotionsPage>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionsPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionsPage);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);

    // Render triggers the httpResource fetch (?isPromoted=true); flush empty.
    fixture.detectChanges();
    httpTesting.expectOne((req) => req.url === '/api/auctions').flush([]);
    await fixture.whenStable();
  });

  afterEach(() => httpTesting.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});