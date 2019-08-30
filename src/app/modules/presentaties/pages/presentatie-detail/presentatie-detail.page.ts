import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModalController, PopoverController} from '@ionic/angular';
import {PresentatieDetailPopMenuComponent} from '../../components/presentatie-detail-pop-menu/presentatie-detail-pop-menu.component';
import {PresentatieZwevendeTekstItemComponent} from '../../components/presentatie-zwevende-tekst-item/presentatie-zwevende-tekst-item.component';
import {PresentatiesService} from '../../shared/presentaties.service';
import {SlidesService} from '../../shared/slides.service';

@Component({
  selector: 'app-presentatie-detail',
  templateUrl: './presentatie-detail.page.html',
  styleUrls: ['./presentatie-detail.page.scss'],
})
export class PresentatieDetailPage implements OnInit {

  slides: any;
  presentatie: any;
  editText = false;

  constructor(private presentatiesService: PresentatiesService, private slidesService: SlidesService, private route: ActivatedRoute, private modalController: ModalController) { }

  ngOnInit() {
    this.slidesService.slides.subscribe(slides => this.slides = slides);

    this.route.params.subscribe(params => {
      this.getSlides(params.id);
      this.getPresentatie(params.id);
    });
  }

  getSlides(presentatieId) {
    this.slidesService.getSlides(presentatieId);
  }

  getPresentatie(presentatieId) {
    this.presentatie = this.presentatiesService.getPresentatie(presentatieId);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PresentatieZwevendeTekstItemComponent
    });
    return await modal.present();
  }
}
