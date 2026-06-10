import { TestBed } from '@angular/core/testing';

import { AuctionsResourceService } from './auctions-resource.service';

describe('AuctionsResourceService', () => {
  let service: AuctionsResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionsResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
