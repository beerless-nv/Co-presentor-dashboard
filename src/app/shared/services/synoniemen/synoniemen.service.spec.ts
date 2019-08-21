import { TestBed } from '@angular/core/testing';

import { SynoniemenService } from './synoniemen.service';

describe('SynoniemenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SynoniemenService = TestBed.get(SynoniemenService);
    expect(service).toBeTruthy();
  });
});
