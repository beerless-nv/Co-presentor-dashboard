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
  processUrl: string;

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

  /**
   * Dismiss the modal.
   */
  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  /**
   * Add files to files array when dropped.
   * @param event (UploadEvent)
   */
  public dropped(event) {
    this.files = event.files;
    this.fileLoaded = true;
  }

  /**
   * Creates a presentation object
   */
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

  /**
   * Updates synonyms
   * Generates upload link
   * If files are present, upload the powerpoint.
   */
  afterSavePresentatie() {
    // update synoniemen
    this.synoniemenService.updateSynoniem(this.synoniemen, this.presentatie.ID, 0).subscribe();

    // generate upload link for presentations
    this.presentatiesService.generateUploadLink(this.presentatie.ID).subscribe((upload: any) => {
      // this.uploadUrl = 'https:' + upload.upload.url + '/' + this.filename;
      this.uploadUrl = 'https:' + upload.upload.url;
      this.processUrl = 'https:' + upload.url;

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

  /**
   * Upload the powerpoint to CloudConvert.
   */
  uploadPresentation(): Promise<string> {
    return new Promise((resolve, reject) => {
      for (const droppedFile of this.files) {
        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            this.isUploading = true;

            this.presentatiesService.uploadPresentatie(file, this.uploadUrl).subscribe(resp => {
              this.checkStatus(this.processUrl);
            });
          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        }
      }
    });
  }

  /**
   * Check status of conversion.
   *
   * @param processUrl (string)
   */
  checkStatus(processUrl: string) {
    const interval = setInterval(() => {
      this.presentatiesService.checkStatus(processUrl).subscribe((status: any) => {
        console.log(status.step);
        if (status.step === 'finished') {
          this.createSlides();
          clearInterval(interval);
        }
      });
    }, 2000);
  }

  /**
   * Create slide objects
   */
  createSlides() {
    this.dismissModal();
    this.presentatiesService.createSlides(this.presentatie).subscribe(resp => {
      this.presentatiesService.getPresentaties();
    });
  }
}
