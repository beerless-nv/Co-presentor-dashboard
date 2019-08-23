import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {PresentatiesService} from '../../shared/presentaties.service';
import ResizeObserver from 'resize-observer-polyfill';
import {SlidesService} from '../../shared/slides.service';
import {PresentatieModalComponent} from '../presentatie-modal/presentatie-modal.component';

@Component({
  selector: 'app-presentatie-card',
  templateUrl: './presentatie-card.component.html',
  styleUrls: ['./presentatie-card.component.scss'],
})
export class PresentatieCardComponent implements OnInit, AfterViewInit {

  @Input() presentatie;
  @ViewChild('imgContainer') imgContainer: ElementRef;

  constructor(public actionSheetController: ActionSheetController, private presentatiesService: PresentatiesService, private slidesService: SlidesService, private modalController: ModalController) {
  }

  ngOnInit() {
    this.slidesService.getSlide(1, this.presentatie.ID).subscribe(slide => {
      this.presentatie.slide = slide[0];
    });

    const interval = setInterval(() => {
      if (this.presentatie.slide === undefined) {
        this.slidesService.getSlide(1, this.presentatie.ID).subscribe(slide => {
          this.presentatie.slide = slide[0];
        });
      } else {
        clearInterval(interval);
      }
    }, 5000);
  }

  ngAfterViewInit(): void {
    this.dynamicCard();
  }

  async presentActionSheet(presentatie) {
    const actionSheet = await this.actionSheetController.create({
      header: presentatie.naam,
      buttons: [{
        text: 'Bewerken',
        icon: 'create',
        handler: () => {
          this.presentUpdatePresentatieModal('Presentatie bewerken', presentatie);
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

  dynamicCard() {
    const ro = new ResizeObserver((entries, observer) => {
      const width = entries[0].contentRect.width;

      this.imgContainer.nativeElement.style.height = width / 16 * 9 + 'px';
    });

    ro.observe(this.imgContainer.nativeElement);
  }

  async presentUpdatePresentatieModal(title, presentatie) {
    const modal = await this.modalController.create({
      component: PresentatieModalComponent,
      componentProps: {
        title,
        presentatie
      }
    });
    return await modal.present();
  }
}
