import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DefinitieItemComponent} from '../../components/definitie-item/definitie-item.component';
import {UpdateDefinitieComponent} from '../../components/update-definitie/update-definitie.component';
import {DefinitiesService} from '../../shared/definities.service';

@Component({
  selector: 'app-definitie-overzicht',
  templateUrl: './definitie-overzicht.page.html',
  styleUrls: ['./definitie-overzicht.page.scss'],
})
export class DefinitieOverzichtPage implements OnInit {

  definities: any;
  searchTerm = '';

  constructor(private definitiesService: DefinitiesService, private modalController: ModalController) { }

  ngOnInit() {
    this.definitiesService.definities.subscribe(definities => {
      this.definities = definities;
    });
  }

  searchDefinities() {
    this.definities = this.definitiesService.filterDefinities(this.searchTerm);
  }

  addDefinitie() {
    this.presentCreateDefinitieModal('Definitie aanmaken');
  }

  async presentCreateDefinitieModal(title) {
    const modal = await this.modalController.create({
      component: UpdateDefinitieComponent,
      componentProps: {
        title
      }
    });
    return await modal.present();
  }

  doRefresh(evt) {
    this.definitiesService.getDefinities();
    setTimeout(() => {
      evt.detail.complete();
    }, 1000);
  }
}
