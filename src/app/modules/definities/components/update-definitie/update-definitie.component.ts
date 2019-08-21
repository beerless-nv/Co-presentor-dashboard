import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {SynoniemenService} from '../../../../shared/services/synoniemen/synoniemen.service';
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

  constructor(private modalController: ModalController, private definitiesService: DefinitiesService, private synoniemenService: SynoniemenService) {
  }

  ngOnInit() {
    if (!this.definitie) {
      this.definitie = {
        naam: '',
        tekst: '',
        synoniemen: []
      };
    }

    this.definitieForm = new FormGroup({
      naam: new FormControl(this.definitie.naam),
      tekst: new FormControl(this.definitie.tekst)
    });

    console.log(this.definitie);
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

  addRow() {
    if (this.definitie) {
      this.definitie.synoniemen.push({naam: '', definitieId: this.definitie.ID, presentatieId: 0});
    }
  }

}
