import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PresentatieModalComponent} from '../../components/presentatie-modal/presentatie-modal.component';
import {PresentatiesService} from '../../shared/presentaties.service';

@Component({
  selector: 'app-presentatie-overzicht',
  templateUrl: './presentatie-overzicht.page.html',
  styleUrls: ['./presentatie-overzicht.page.scss'],
})
export class PresentatieOverzichtPage implements OnInit {

  presentaties: any = [];
  slide: any;
  searchTerm = '';

  constructor(private presentatiesService: PresentatiesService, private modalController: ModalController) {
  }

  ngOnInit() {
    this.presentatiesService.presentaties.subscribe((presentaties: any) => {
        this.presentaties = presentaties;
    });
  }

  searchPresentaties() {
    this.presentaties = this.presentatiesService.filterPresentaties(this.searchTerm);
  }

  createPresentatie() {
    this.presentCreatePresentatieModal('Presentatie aanmaken');
  }

  async presentCreatePresentatieModal(title) {
    const modal = await this.modalController.create({
      component: PresentatieModalComponent,
      componentProps: {
        title
      }
    });
    return await modal.present();
  }
}
