import {ChangeDetectionStrategy, Component, DoCheck, Input, IterableDiffers, OnChanges, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SlidesService} from '../../shared/slides.service';
import {PresentatiesService} from '../../shared/presentaties.service';
import {tap} from 'rxjs/operators';
import {ErrorSuccessMessagesService} from '../../../../shared/services/error-success-messages/error-success-messages.service';

@Component({
  selector: 'app-presentatie-zwevende-tekst',
  templateUrl: './presentatie-zwevende-tekst.component.html',
  styleUrls: ['./presentatie-zwevende-tekst.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentatieZwevendeTekstComponent implements OnInit, DoCheck {

  @Input() zwevendeTeksten: Array<any>;
  @Input() vrijeSlides: Array<any>;
  iterableDiffer;

  constructor(
    private modalController: ModalController,
    private slidesService: SlidesService,
    private presentatiesSerivce: PresentatiesService,
    private iterableDiffers: IterableDiffers,
  ) {
    this.iterableDiffer = this.iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.vrijeSlides);
    if (changes) {
      this.vrijeSlides = this.vrijeSlides.slice();
      this.zwevendeTeksten = this.zwevendeTeksten.filter(zwevendeTekst => {
        return zwevendeTekst.used !== true;
      });
      this.dismissModal();
    }
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true,
      zwevendeTeksten: this.zwevendeTeksten
    });
  }
}
