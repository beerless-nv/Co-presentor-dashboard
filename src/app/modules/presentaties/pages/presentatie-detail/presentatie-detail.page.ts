import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {PresentatieZwevendeTekstComponent} from '../../components/presentatie-zwevende-tekst/presentatie-zwevende-tekst.component';
import {PresentatiesService} from '../../shared/presentaties.service';
import {SlidesService} from '../../shared/slides.service';
import {ZwevendeTekstenService} from '../../shared/zwevende-teksten.service';

@Component({
  selector: 'app-presentatie-detail',
  templateUrl: './presentatie-detail.page.html',
  styleUrls: ['./presentatie-detail.page.scss'],
})
export class PresentatieDetailPage implements OnInit {

  slides: Array<any>;
  presentatie: any;
  zwevendeTeksten: Array<any>;

  constructor(
    private presentatiesService: PresentatiesService,
    private slidesService: SlidesService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private zwevendeTekstenService: ZwevendeTekstenService) {
  }

  ngOnInit() {
    this.slidesService.slides.subscribe(slides => this.slides = slides);

    this.route.params.subscribe(params => {
      this.getPresentatie(params.id);
      this.getSlides(params.id);
    });
  }

  getSlides(presentatieId) {
    this.slidesService.getSlides(presentatieId);
  }

  getPresentatie(presentatieId) {
    this.presentatiesService.getPresentatie(presentatieId).subscribe(presentatie => {
      this.presentatie = presentatie;
      this.getZwevendeTeksten();
    });
  }

  getZwevendeTeksten() {
    this.zwevendeTekstenService.getZwevendeTekstenByPresentatieId(this.presentatie.ID).subscribe((zwevendeTeksten: any) => this.zwevendeTeksten = zwevendeTeksten);
  }

  async presentZwevendeTekstenModal() {
    // get all empty slides
    const slides = await this.slides.filter(slide => {
      if (!slide.slide.tekst || slide.slide.tekst === '') {
        return slide;
      }
    });

    // create modal
    const modal = await this.modalController.create({
      component: PresentatieZwevendeTekstComponent,
      componentProps: {
        zwevendeTeksten: this.zwevendeTeksten,
        vrijeSlides: slides
      }
    });

    // if modal is dismissed, execute following function
    modal.onDidDismiss().then(data => {
      console.log(data);
      if (data.data) {
        this.zwevendeTeksten = data.data.zwevendeTeksten;
      }
    });

    // open modal
    return await modal.present();
  }
}
