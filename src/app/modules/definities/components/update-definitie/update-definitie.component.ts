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
  synoniemen = [];

  constructor(
    private modalController: ModalController,
    private definitiesService: DefinitiesService,
    private synoniemenService: SynoniemenService
  ) {}

  ngOnInit() {
    // Check if a definition is being updated or a new definition is being created.
    // Create a new definition object if a new definition is being created.
    if (!this.definitie) {
      this.definitie = {
        naam: '',
        tekst: '',
        synoniemen: []
      };
    }

    // If the definition has synonyms, attach the synonyms to a new object.
    if (this.definitie.synoniemen) {
      this.synoniemen = this.definitie.synoniemen;
    }

    // Instantiate the definition form
    this.definitieForm = new FormGroup({
      naam: new FormControl(this.definitie.naam),
      tekst: new FormControl(this.definitie.tekst)
    });
  }

  /**
   * Closes the active modal.
   */
  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  /**
   * The definition is being created or updated.
   */
  saveDefinitie() {
    // check if form is valid
    if (this.definitieForm.valid) {

      // check if the definition needs to be updated or created.
      // this can be done by checking if the definition object has an id or not
      // if an id is present, the object comes from the database, if not the object is new
      if (this.definitie.ID) {
        this.definitiesService.updateDefinitie(this.definitieForm.value, this.definitie.ID)
          .subscribe(resp => {

            // after updating the definition, the synonyms are also being updated
            this.synoniemenService.updateSynoniem(this.synoniemen, 0, this.definitie.ID).subscribe();
            this.definitiesService.getDefinities();
          });
      } else {
        this.definitiesService.createDefinitie(this.definitieForm.value).subscribe((resp: any) => {

          // check if there is a synonym object present, if so, the synonym(s) are created
          if (this.synoniemen[0].naam !== '') {
            this.synoniemenService.updateSynoniem(this.synoniemen, 0, resp.ID).subscribe();
          }
          this.definitiesService.getDefinities();
        });
      }

      // dismiss modal when done updating
      this.dismissModal();
    }
  }
}
