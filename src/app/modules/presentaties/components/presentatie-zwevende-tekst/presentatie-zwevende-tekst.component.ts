import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ZwevendeTekstenService} from '../../shared/zwevende-teksten.service';

@Component({
  selector: 'app-presentatie-zwevende-tekst',
  templateUrl: './presentatie-zwevende-tekst.component.html',
  styleUrls: ['./presentatie-zwevende-tekst.component.scss'],
})
export class PresentatieZwevendeTekstComponent implements OnInit {

  @Input() presentatieId: number;
  @Input() vrijeSlides: Array<any>;
  zwevendeTeksten: Array<any>;

  constructor(private modalController: ModalController, private zwevendeTekstenService: ZwevendeTekstenService) {
  }

  ngOnInit() {
    this.zwevendeTekstenService.getZwevendeTekstenByPresentatieId(this.presentatieId).subscribe((zwevendeTeksten: any) => this.zwevendeTeksten = zwevendeTeksten);
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
