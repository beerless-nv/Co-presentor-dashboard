import { TestBed } from '@angular/core/testing';

import { ErrorSuccessMessagesService } from './error-success-messages.service';

describe('ErrorSuccessMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorSuccessMessagesService = TestBed.get(ErrorSuccessMessagesService);
    expect(service).toBeTruthy();
  });
});
