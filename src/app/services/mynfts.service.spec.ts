import { TestBed } from '@angular/core/testing';

import { MynftsService } from './mynfts.service';

describe('MynftsService', () => {
  let service: MynftsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MynftsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
