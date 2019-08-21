import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {SynoniemenService} from '../../../../shared/services/synoniemen/synoniemen.service';
import {DefinitiesService} from '../../shared/definities.service';

@Component({
  selector: 'app-definitie-synoniem',
  templateUrl: './definitie-synoniem.component.html',
  styleUrls: ['./definitie-synoniem.component.scss'],
})
export class DefinitieSynoniemComponent implements OnInit {

  @Input() synoniem;
  @Input() definitieId;
  @ViewChild('value') value: ElementRef;
  edit = false;

  constructor(private synoniemenService: SynoniemenService, private definitiesService: DefinitiesService, private alertController: AlertController) {
  }

  ngOnInit() {
    console.log(this.definitieId);
    if (this.synoniem && this.synoniem.naam === '') {
      this.focusEdit();
    }
  }

  updateSynoniem(value) {
    if (this.synoniem && this.synoniem.naam) {
      this.synoniem.naam = value;
      this.synoniemenService.updateSynoniem(this.synoniem, this.synoniem.ID).subscribe(resp => {
        this.edit = false;
        this.definitiesService.getDefinities();
      });
    } else {
      this.synoniem = {
        naam: value,
        definitieId: this.definitieId,
        presentatieId: 0
      };
      console.log(this.synoniem);
      this.synoniemenService.createSynoniem(this.synoniem).subscribe(resp => {
        this.edit = false;
        this.definitiesService.getDefinitie(this.definitieId);
        this.definitiesService.getDefinities();
      });
    }

  }

  deleteSynoniem() {
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Verwijderen',
      message: 'Weet je zeker dat je dit synoniem wil <strong>verwijderen</strong>?',
      buttons: [
        {
          text: 'Annuleren',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Verwijderen',
          handler: () => {
            this.synoniemenService.deleteSynoniem(this.synoniem.ID).subscribe(resp => {
              this.definitiesService.getDefinitie(this.definitieId);
              this.definitiesService.getDefinities();
              // this.synoniem = null;
            });
          }
        }
      ]
    });

    await alert.present();
  }

  focusEdit() {
    setTimeout(() => {
      if (this.value) {
        this.value.nativeElement.focus();
        this.placeCaretAtEnd(this.value.nativeElement);
      }
    }, 1);
  }

  placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection !== 'undefined'
      && typeof document.createRange !== 'undefined') {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

}
