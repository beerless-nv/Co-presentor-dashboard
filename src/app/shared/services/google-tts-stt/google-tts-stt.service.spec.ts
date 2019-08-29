import { TestBed } from '@angular/core/testing';

import { GoogleTtsSttService } from './google-tts-stt.service';

describe('GoogleTtsSttService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleTtsSttService = TestBed.get(GoogleTtsSttService);
    expect(service).toBeTruthy();
  });
});
