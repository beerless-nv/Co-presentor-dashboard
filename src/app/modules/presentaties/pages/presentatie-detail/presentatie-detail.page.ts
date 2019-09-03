import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {PresentatieZwevendeTekstComponent} from '../../components/presentatie-zwevende-tekst/presentatie-zwevende-tekst.component';
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

  constructor(private presentatiesService: PresentatiesService, private slidesService: SlidesService, private route: ActivatedRoute, private modalController: ModalController) {
  }

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
    this.presentatiesService.getPresentatie(presentatieId).subscribe(presentatie => this.presentatie = presentatie);
  }

  async presentZwevendeTekstenModal() {
    const slides = await this.slides.filter(slide => {
      if (!slide.slide.tekst || slide.slide.tekst === '') { return slide; }
    });

    const modal = await this.modalController.create({
      component: PresentatieZwevendeTekstComponent,
      componentProps: {
        presentatieId: this.presentatie.ID,
        vrijeSlides: slides
      }
    });
    return await modal.present();
  }
}
