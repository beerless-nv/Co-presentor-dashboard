import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {DefinitiesService} from '../../shared/definities.service';

@Component({
  selector: 'app-update-definitie',
  templateUrl: './update-definitie.component.html',
  styleUrls: ['./update-definitie.component.scss'],
})
export class UpdateDefinitieComponent implements OnInit {

  @Input() title: string;
  @Input() definitie: any;
  definitieForm: FormGroup;

  constructor(private modalController: ModalController, private definitiesService: DefinitiesService) {
  }

  ngOnInit() {
    if (!this.definitie) {
      this.definitie = {
        naam: '',
        tekst: ''
      };
    }

    this.definitieForm = new FormGroup({
      naam: new FormControl(this.definitie.naam),
      tekst: new FormControl(this.definitie.tekst)
    });
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  saveDefinitie() {
    if (this.definitieForm.valid) {
      if (this.definitie.ID) {
        this.definitiesService.updateDefinitie(this.definitieForm.value, this.definitie.ID);
      } else {
        this.definitiesService.createDefinitie(this.definitieForm.value);
      }
      this.dismissModal();
    }
  }

}
