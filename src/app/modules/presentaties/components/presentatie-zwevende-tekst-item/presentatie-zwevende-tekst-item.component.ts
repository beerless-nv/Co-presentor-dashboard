import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {tap} from 'rxjs/operators';
import {ErrorSuccessMessagesService} from '../../../../shared/services/error-success-messages/error-success-messages.service';
import {PresentatiesService} from '../../shared/presentaties.service';
import {SlidesService} from '../../shared/slides.service';
import {ZwevendeTekstenService} from '../../shared/zwevende-teksten.service';

@Component({
  selector: 'app-presentatie-zwevende-tekst-item',
  templateUrl: './presentatie-zwevende-tekst-item.component.html',
  styleUrls: ['./presentatie-zwevende-tekst-item.component.scss'],
})
export class PresentatieZwevendeTekstItemComponent implements OnInit {

  @Input() zwevendeTekst: any;
  @Input() vrijeSlides: Array<any>;

  constructor(private modalController: ModalController, private zwevendeTekstenService: ZwevendeTekstenService, private slidesService: SlidesService, private errorSuccessMessagesService: ErrorSuccessMessagesService, private presentatiesService: PresentatiesService) {
  }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  selectSlide(slideId) {
    const slide = {
      tekst: this.zwevendeTekst.tekst,
      ssml: this.zwevendeTekst.ssml
    };

    this.slidesService.updateSlide(slide, slideId)
      .pipe(
        tap(resp => {
          this.errorSuccessMessagesService.successMessage$.next('Zwevende tekst is toegevoegd');
        })
      ).subscribe();
    this.zwevendeTekstenService.deleteZwevendeTekst(this.zwevendeTekst.ID).subscribe(resp => {
      this.presentatiesService.getPresentaties();
    });
  }
}
