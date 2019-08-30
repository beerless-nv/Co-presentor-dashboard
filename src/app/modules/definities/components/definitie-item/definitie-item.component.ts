import {Component, Input, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, ModalController} from '@ionic/angular';
import {GoogleTtsSttService} from '../../../../shared/services/google-tts-stt/google-tts-stt.service';
import {DefinitiesService} from '../../shared/definities.service';
import {UpdateDefinitieComponent} from '../update-definitie/update-definitie.component';

@Component({
  selector: 'app-definitie-item',
  templateUrl: './definitie-item.component.html',
  styleUrls: ['./definitie-item.component.scss'],
})
export class DefinitieItemComponent implements OnInit {

  @Input() definitie;
  synoniemen;
  speaking = false;
  audio;

  constructor(private actionSheetController: ActionSheetController, private alertController: AlertController, private modalController: ModalController, private definitiesService: DefinitiesService, private googleTtsSttService: GoogleTtsSttService) {
  }

  ngOnInit() {
    if (this.definitie.synoniemen) {
      this.synoniemen = this.definitie.synoniemen.map(synoniem => synoniem.naam);
    }
  }

  async presentActionSheet(definitie) {
    const actionSheet = await this.actionSheetController.create({
      header: definitie.naam,
      buttons: [{
        text: 'Bewerken',
        icon: 'create',
        handler: () => {
          this.presentUpdateDefinitieModal('Definitie aanpassen', definitie);
        }
      }, {
        text: 'Verwijderen',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteDefinitieConfirm(definitie.ID);
        }
      }, {
        text: 'Annuleren',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  async deleteDefinitieConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Verwijderen',
      message: 'Weet je zeker dat je deze definitie wilt <strong>verwijderen</strong>?',
      buttons: [
        {
          text: 'Annuleren',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Verwijderen',
          handler: () => {
            this.definitiesService.deleteDefinitie(id).subscribe(resp => {
              this.definitiesService.getDefinities();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentUpdateDefinitieModal(title, definitie) {
    const modal = await this.modalController.create({
      component: UpdateDefinitieComponent,
      componentProps: {
        title,
        definitie
      }
    });
    return await modal.present();
  }

  tts() {
    this.speaking = true;

    const ttsObject = {
      audioConfig: {
        audioEncoding: 'MP3',
        pitch: 0,
        speakingRate: 1
      },
      input: {
        ssml: this.definitie.ssml
      },
      voice: {
        languageCode: 'nl-NL',
        name: 'nl-NL-Wavenet-E'
      }
    };

    this.googleTtsSttService.tts(ttsObject).subscribe(speach => {
      this.playAudio(speach);
    });
  }

  playAudio(mp3) {
    this.audio = new Audio('data:audio/mp3;base64,' + mp3.audioContent);

    this.audio.play();
    this.audio.onended = () => {
      this.speaking = false;
    };
  }

  stopAudio() {
    this.speaking = false;

    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
