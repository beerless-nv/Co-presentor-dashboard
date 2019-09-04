import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ErrorSuccessMessagesService} from '../../../../shared/services/error-success-messages/error-success-messages.service';
import {PresentatiesService} from '../../shared/presentaties.service';
import {SlidesService} from '../../shared/slides.service';
import {ZwevendeTekstenService} from '../../shared/zwevende-teksten.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-presentatie-zwevende-tekst-item',
  templateUrl: './presentatie-zwevende-tekst-item.component.html',
  styleUrls: ['./presentatie-zwevende-tekst-item.component.scss']
})
export class PresentatieZwevendeTekstItemComponent implements OnInit {

  @Input() zwevendeTekst: any;
  @Input() vrijeSlides: Array<any>;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalController: ModalController,
    private zwevendeTekstenService: ZwevendeTekstenService,
    private slidesService: SlidesService,
    private errorSuccessMessagesService: ErrorSuccessMessagesService,
    private presentatiesService: PresentatiesService) {
  }

  ngOnInit() {
    console.log('changes');
  }

  selectSlide(volgnummer) {
    // update slide object with zwevende tekst
    const slide = this.vrijeSlides.find(vrijeSlide => {
      return vrijeSlide.slide.volgnummer === volgnummer;
    });
    slide.slide.tekst = this.zwevendeTekst.tekst;

    // let parent component know zwevende tekst is used
    this.zwevendeTekst.used = true;

    // delete slide from vrije slides
    this.vrijeSlides.splice(0, 1);

    // update slide
    this.slidesService.updateSlide(slide.slide, slide.slide.ID)
      .pipe(
        tap(resp => {
          this.errorSuccessMessagesService.successMessage$.next('Zwevende tekst is toegevoegd');
        })
      ).subscribe();

    // delete used zwevende tekst
    this.zwevendeTekstenService.deleteZwevendeTekst(this.zwevendeTekst.ID).subscribe(resp => {
      this.presentatiesService.getPresentaties();
    });
  }
}
