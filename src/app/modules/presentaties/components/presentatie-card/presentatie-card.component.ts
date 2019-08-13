import {Component, Input, OnInit} from '@angular/core';
import {ActionSheetController} from '@ionic/angular';
import {PresentatiesService} from '../../shared/presentaties.service';

@Component({
  selector: 'app-presentatie-card',
  templateUrl: './presentatie-card.component.html',
  styleUrls: ['./presentatie-card.component.scss'],
})
export class PresentatieCardComponent implements OnInit {

  @Input() presentatie;

  constructor(public actionSheetController: ActionSheetController, private presentatiesService: PresentatiesService) {
  }

  ngOnInit() {
  }

  async presentActionSheet(presentatie) {
    const actionSheet = await this.actionSheetController.create({
      header: presentatie.naam,
      buttons: [{
        text: 'Bewerken',
        icon: 'create',
        handler: () => {
        }
      }, {
        text: 'Verwijderen',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.presentatiesService.deletePresentatie(presentatie.ID);
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
}
