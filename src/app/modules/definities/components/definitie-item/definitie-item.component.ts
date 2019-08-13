import {Component, Input, OnInit} from '@angular/core';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {DefinitiesService} from '../../shared/definities.service';
import {UpdateDefinitieComponent} from '../update-definitie/update-definitie.component';

@Component({
  selector: 'app-definitie-item',
  templateUrl: './definitie-item.component.html',
  styleUrls: ['./definitie-item.component.scss'],
})
export class DefinitieItemComponent implements OnInit {

  @Input() definitie;

  constructor(private actionSheetController: ActionSheetController, private modalController: ModalController, private definitiesService: DefinitiesService) {
  }

  ngOnInit() {
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
          this.definitiesService.deleteDefinitie(definitie.ID);
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
