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
  file;
  filename: string;
  isUploading = false;
  fileLoaded = false;
  uploadUrl: string;

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
    // update synoniemen
    this.synoniemenService.updateSynoniem(this.synoniemen, this.presentatie.ID, 0).subscribe();

    // generate upload link for presentations
    this.presentatiesService.generateUploadLink(this.presentatie.ID).subscribe((upload: any) => {
      // this.uploadUrl = 'https:' + upload.upload.url + '/' + this.filename;
      this.uploadUrl = 'https:' + upload.upload.url;

      // if (this.file) {
      if (this.files.length > 0) {
        this.uploadPresentation().then(resp => {
          this.dismissModal();
        });
      } else {
        this.dismissModal();
      }
    });

    this.presentatiesService.getPresentaties();
  }

  // public dropped(event) {
  //   // this.files = event.files;
  //   this.fileLoaded = true;
  //
  //   const fileReader = new FileReader();
  //   fileReader.onload = (e) => {
  //     this.file = fileReader.result;
  //   };
  //   fileReader.readAsText(event.target.files[0]);
  //
  //   this.filename = event.target.files[0].name;
  // }

  public dropped(event) {
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

            this.presentatiesService.uploadPresentatie(file, this.uploadUrl).subscribe(resp => {
              this.createSlides();
            });
          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        }
      }

      // this.presentatiesService.uploadPresentatie(this.file, this.uploadUrl).subscribe(resp => {
      //   this.presentatiesService.getPresentaties();
      //   resolve('upload done');
      // });
    });
  }

  createSlides() {
    this.presentatiesService.createSlides(this.presentatie).subscribe(resp => {
      this.presentatiesService.getPresentaties();
      this.dismissModal();
    });
  }
}
