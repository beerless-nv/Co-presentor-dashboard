import {Component, OnInit} from '@angular/core';
import {TtsInstellingenService} from '../../../../shared/services/tts-instellingen/tts-instellingen.service';

@Component({
  selector: 'app-settings-tts',
  templateUrl: './settings-tts.page.html',
  styleUrls: ['./settings-tts.page.scss'],
})
export class SettingsTtsPage implements OnInit {

  ttsInstellingen: Array<any>;

  constructor(
    private ttsInstellingenService: TtsInstellingenService
  ) {
  }

  ngOnInit() {
    this.getTtsInstellingen();
  }

  getTtsInstellingen() {
    this.ttsInstellingenService.ttsInstellingen$.subscribe(ttsInstellingen => {
      this.ttsInstellingen = ttsInstellingen;
    });
  }
}
