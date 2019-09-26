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

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private modalController: ModalController,
    private definitiesService: DefinitiesService,
    private googleTtsSttService: GoogleTtsSttService
  ) {}

  ngOnInit() {
    // put name of synonyms in different variable to join names in frontend
    if (this.definitie.synoniemen) {
      this.synoniemen = this.definitie.synoniemen.map(synoniem => synoniem.naam);
    }
  }

  /**
   * Presents action sheet for a specific definition.
   * The action sheet contains multiple actions such as update and delete.
   * When choosing update, the update modal opens up.
   * When choosing delete, a confirm message is shown and depending on the users action
   * the DELETE method is triggered or the delete action is cancelled.
   * When choosing cancel, the modal closes.
   *
   * @param definitie (object)
   */
  async presentActionSheet(definitie: any) {
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

  /**
   * Presents a confirm message before calling DELETE method on this definition.
   * When choosing cancel, the alert closes.
   * When chosing delete, the DELETE method is triggered and thereafter the modal closes.
   *
   * @param id (number)
   */
  async deleteDefinitieConfirm(id: number) {
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

  /**
   * Presents the update definition modal.
   * The definitions title and definition are sent to the modal.
   *
   * @param title (string)
   * @param definitie (number)
   */
  async presentUpdateDefinitieModal(title: string, definitie: string) {
    const modal = await this.modalController.create({
      component: UpdateDefinitieComponent,
      componentProps: {
        title,
        definitie
      }
    });
    return await modal.present();
  }

  /**
   * Depending on the state of the speaking variable two things can happen:
   * 1. if speaking = true, the audio file is being stopped.
   * 2. if speaking = false, the audio file is being started.
   */
  tts() {
    if (this.speaking) {
      this.stopAudio();
    } else {
      this.playAudio();
    }
  }

  /**
   * The audio file is being started by creating a text to speech object and sending it to
   * the TTS API from Google.
   */
  playAudio() {
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

    this.googleTtsSttService.tts(ttsObject).subscribe((mp3: any) => {
      // create new Audio object
      this.audio = new Audio('data:audio/mp3;base64,' + mp3.audioContent);

      this.audio.play();

      // if the audio is over, the speaking object is set to false
      this.audio.onended = () => {
        this.speaking = false;
      };
    });
  }

  /**
   * The audio file is being stopped.
   */
  stopAudio() {
    this.speaking = false;

    // to stop the audio from playing, the audio file is paused and the currentTime is being reset.
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
