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
  files: UploadFile[] = [];
  isUploading = false;
  fileLoaded = false;

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
        this.presentatiesService.updatePresentatie(this.presentatieForm.value, this.presentatie.ID).subscribe(presentatie => {
          this.afterSavePresentatie();
        });
      } else {
        this.presentatiesService.createPresentatie(this.presentatieForm.value).subscribe(presentatie => {
          this.presentatie = presentatie;
          this.afterSavePresentatie();
        });
      }
    }
  }

  afterSavePresentatie() {
    this.synoniemenService.updateSynoniem(this.synoniemen, this.presentatie.ID, 0).subscribe();
    if (this.files.length > 0) {
      this.uploadPresentation().then(resp => {
        this.dismissModal();
      });
    } else {
      this.dismissModal();
    }
    this.presentatiesService.getPresentaties();
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    this.fileLoaded = true;
  }

  uploadPresentation(): Promise<string> {
    return new Promise((resolve, reject) => {
      for (const droppedFile of this.files) {

        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            this.isUploading = true;

            this.presentatiesService.uploadPresentatie(file, this.presentatie).subscribe(resp => {
              this.presentatiesService.getPresentaties();
              resolve('upload done');
            });
          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        }
      }
    });
  }
}
