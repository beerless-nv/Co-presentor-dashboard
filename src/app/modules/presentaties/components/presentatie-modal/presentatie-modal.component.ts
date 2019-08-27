import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {SynoniemenService} from '../../../../shared/services/synoniemen/synoniemen.service';
import {PresentatiesService} from '../../shared/presentaties.service';
import {UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry} from 'ngx-file-drop';

@Component({
  selector: 'app-presentatie-modal',
  templateUrl: './presentatie-modal.component.html',
  styleUrls: ['./presentatie-modal.component.scss'],
})
export class PresentatieModalComponent implements OnInit {

  @Input() title: string;
  @Input() presentatie: any;
  synoniemen = [];
  presentatieForm: FormGroup;
  showFirst = true;
  files: UploadFile[] = [];
  isUploading = false;

  constructor(private modalController: ModalController, private presentatiesService: PresentatiesService, private synoniemenService: SynoniemenService) {
  }

  ngOnInit() {
    if (!this.presentatie) {
      this.presentatie = {
        naam: '',
        beschrijving: ''
      };
    }

    if (this.presentatie.synoniemen) {
      this.synoniemen = this.presentatie.synoniemen;
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
        this.presentatiesService.updatePresentatie(this.presentatieForm.value, this.presentatie.ID).subscribe(resp => {
          this.synoniemenService.updateSynoniem(this.synoniemen, this.presentatie.ID, 0).subscribe();
          this.presentatiesService.getPresentaties();
        });
      } else {
        this.presentatiesService.createPresentatie(this.presentatieForm.value).subscribe(presentatie => {
          this.presentatie = presentatie;
          this.synoniemenService.updateSynoniem(this.synoniemen, this.presentatie.ID, 0).subscribe();
          this.presentatiesService.getPresentaties();
        });
      }
      this.showFirst = false;
    }
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.isUploading = true;

          this.presentatiesService.uploadPresentatie(file, this.presentatie).subscribe(resp => {
            this.dismissModal();
            this.presentatiesService.getPresentaties();
          });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
}
