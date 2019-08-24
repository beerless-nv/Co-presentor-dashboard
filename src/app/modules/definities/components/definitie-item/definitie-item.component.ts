import {Component, Input, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, ModalController} from '@ionic/angular';
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

  constructor(private actionSheetController: ActionSheetController, private alertController: AlertController, private modalController: ModalController, private definitiesService: DefinitiesService) {
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
}
