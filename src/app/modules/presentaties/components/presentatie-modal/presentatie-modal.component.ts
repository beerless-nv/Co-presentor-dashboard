import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ModalController} from '@ionic/angular';
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
  presentatieForm: FormGroup;
  showFirst = true;
  files: UploadFile[] = [];
  isUploading = false;

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
        this.presentatiesService.updatePresentatie(this.presentatieForm.value, this.presentatie.ID).subscribe(() => {
          this.presentatiesService.getPresentaties();
        });
      } else {
        this.presentatiesService.createPresentatie(this.presentatieForm.value).subscribe(presentatie => {
          this.presentatie = presentatie;
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

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          this.isUploading = true;

          this.presentatiesService.uploadPresentatie(file, this.presentatie).subscribe(resp => {
            this.dismissModal();
            this.presentatiesService.getPresentaties();
          });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
