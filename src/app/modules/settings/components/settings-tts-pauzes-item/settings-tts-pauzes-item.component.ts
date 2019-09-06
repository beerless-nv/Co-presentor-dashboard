import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TtsInstellingenService} from '../../../../shared/services/tts-instellingen/tts-instellingen.service';
import {DefinitiesService} from '../../../definities/shared/definities.service';
import {SlidesService} from '../../../presentaties/shared/slides.service';

@Component({
  selector: 'app-settings-tts-pauzes-item',
  templateUrl: './settings-tts-pauzes-item.component.html',
  styleUrls: ['./settings-tts-pauzes-item.component.scss'],
})
export class SettingsTtsPauzesItemComponent implements OnInit {

  @Input() pauzeItem: any;
  value: number;

  constructor(
    private ttsInstellingenService: TtsInstellingenService,
    private definitiesService: DefinitiesService,
    private slidesService: SlidesService
  ) {
  }

  ngOnInit() {
    this.value = this.pauzeItem.waarde;
  }

  changeValue(event) {
    this.value = Math.round(event.detail.value * 10) / 10;
  }

  updateItem() {
    this.pauzeItem.waarde = this.value;
    this.ttsInstellingenService.updateTtsInstellingen(this.pauzeItem.ID, this.pauzeItem).subscribe(resp => {
      // update tts instellingen
      this.ttsInstellingenService.getTtsInstellingen();

      // Update all definitie teksten
      this.definitiesService.updateAllDefinitiesTekst().then(result => {
        console.log('done definitie teksten');
      });

      // Update all presentatie teksten
      this.slidesService.updateAllSlidesTekst().then(result => {
        console.log('done presentatie teksten');
      });
      console.log(resp);
    });
  }
}
