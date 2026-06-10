import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuctionsPage } from './auctions-page';

describe('AuctionsPage', () => {
  let component: AuctionsPage;
  let fixture: ComponentFixture<AuctionsPage>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionsPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionsPage);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);

    // Render triggers the httpResource fetch; satisfy it with an empty list.
    fixture.detectChanges();
    httpTesting.expectOne((req) => req.url === '/api/auctions').flush([]);
    await fixture.whenStable();
  });

  afterEach(() => httpTesting.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});