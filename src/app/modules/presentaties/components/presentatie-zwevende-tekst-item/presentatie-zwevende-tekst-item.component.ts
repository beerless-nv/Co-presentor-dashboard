import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-presentatie-zwevende-tekst-item',
  templateUrl: './presentatie-zwevende-tekst-item.component.html',
  styleUrls: ['./presentatie-zwevende-tekst-item.component.scss'],
})
export class PresentatieZwevendeTekstItemComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
