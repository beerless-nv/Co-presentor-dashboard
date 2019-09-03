import { TestBed } from '@angular/core/testing';

import { ZwevendeTekstenService } from './zwevende-teksten.service';

describe('ZwevendeTekstenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZwevendeTekstenService = TestBed.get(ZwevendeTekstenService);
    expect(service).toBeTruthy();
  });
});
