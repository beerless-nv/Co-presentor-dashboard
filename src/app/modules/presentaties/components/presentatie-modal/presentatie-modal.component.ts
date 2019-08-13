import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {PresentatiesService} from '../../shared/presentaties.service';

@Component({
  selector: 'app-presentatie-modal',
  templateUrl: './presentatie-modal.component.html',
  styleUrls: ['./presentatie-modal.component.scss'],
})
export class PresentatieModalComponent implements OnInit {

  @Input() title: string;
  @Input() presentatie: any;
  presentatieForm: FormGroup;

  constructor(private modalController: ModalController, private presentatiesService: PresentatiesService) {
  }

  ngOnInit() {
    if (!this.presentatie) {
      this.presentatie = {
        naam: '',
        beschrijving: ''
      };
    }

    this.presentatieForm = new FormGroup({
      naam: new FormControl(this.presentatie.naam),
      beschrijving: new FormControl(this.presentatie.beschrijving)
    });
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  savePresentatie() {
    if (this.presentatieForm.valid) {
      if (this.presentatie.ID) {
        // this.presentatiesService.updatePresentatie(this.presentatieForm.value, this.presentatie.ID);
      } else {
        // this.presentatiesService.createPresentatie(this.presentatieForm.value);
      }
      this.dismissModal();
    }
  }
}
