import { TestBed } from '@angular/core/testing';

import { DefinitiesService } from './definities.service';

describe('DefinitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefinitiesService = TestBed.get(DefinitiesService);
    expect(service).toBeTruthy();
  });
});
