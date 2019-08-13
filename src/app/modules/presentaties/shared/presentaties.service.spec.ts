import { TestBed } from '@angular/core/testing';

import { PresentatiesService } from './presentaties.service';

describe('PresentatiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentatiesService = TestBed.get(PresentatiesService);
    expect(service).toBeTruthy();
  });
});
