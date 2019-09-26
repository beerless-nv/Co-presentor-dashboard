import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
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

  constructor(
    private definitiesService: DefinitiesService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // Subscribe to definitions object.
    this.definitiesService.definities.subscribe(definities => {
      this.definities = definities;
    });
  }

  /**
   * Search between all the definitions.
   */
  searchDefinities() {
    this.definities = this.definitiesService.filterDefinities(this.searchTerm);
  }

  /**
   * Present the definition modal.
   */
  addDefinitie() {
    this.presentCreateDefinitieModal('Definitie aanmaken');
  }

  /**
   * Presents the definition modal.
   * The definitions title is send with the modal.
   *
   * @param title (string)
   */
  async presentCreateDefinitieModal(title: string) {
    const modal = await this.modalController.create({
      component: UpdateDefinitieComponent,
      componentProps: {
        title
      }
    });
    return await modal.present();
  }

  /**
   * Refresh the pages content.
   *
   * @param evt ($event)
   */
  doRefresh(evt) {
    this.definitiesService.getDefinities();
    setTimeout(() => {
      evt.detail.complete();
    }, 1000);
  }
}
