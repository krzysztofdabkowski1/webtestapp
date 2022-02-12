import { TestBed } from '@angular/core/testing';

import { BundleCollectorService } from './bundle-collector.service';

describe('BundleCollectorService', () => {
  let service: BundleCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BundleCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
