import { TestBed } from '@angular/core/testing';

import { TtsInstellingenService } from './tts-instellingen.service';

describe('TtsInstellingenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TtsInstellingenService = TestBed.get(TtsInstellingenService);
    expect(service).toBeTruthy();
  });
});
