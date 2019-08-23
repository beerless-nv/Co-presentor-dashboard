import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {SynoniemenService} from '../../services/synoniemen/synoniemen.service';

@Component({
  selector: 'app-crud-synoniem',
  templateUrl: './crud-synoniem.component.html',
  styleUrls: ['./crud-synoniem.component.scss'],
})
export class CrudSynoniemComponent implements OnInit {

  @Input() synoniemen = [];
  @ViewChild('value') value: ElementRef;
  edit = null;

  constructor(private synoniemenService: SynoniemenService, private alertController: AlertController) {
  }

  ngOnInit() {
    if (this.synoniemen && this.synoniemen.length === 0) {
      this.synoniemen.push({naam: ''});
    }
  }

  createSynoniem() {
    const id = this.synoniemen.push({naam: ''});
    this.editSynoniem(id - 1);
  }

  updateSynoniem(value, id) {
    this.synoniemen[id].naam = value;
    this.editSynoniem(id);
  }

  deleteSynoniem(id) {
    this.presentAlertConfirm(id);
  }

  editSynoniem(id) {
    if (this.edit !== id) {
      this.edit = id;
      this.focusEdit();
    } else {
      this.edit = null;
    }
  }

  async presentAlertConfirm(id) {
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
            this.synoniemen.splice(id, 1);
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
