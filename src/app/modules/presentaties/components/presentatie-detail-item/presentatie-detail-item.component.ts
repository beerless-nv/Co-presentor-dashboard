import {Component, Input, OnInit} from '@angular/core';
import {ActionSheetController} from '@ionic/angular';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';
import {SlidesService} from '../../shared/slides.service';

@Component({
  selector: 'app-presentatie-detail-item',
  templateUrl: './presentatie-detail-item.component.html',
  styleUrls: ['./presentatie-detail-item.component.scss'],
})
export class PresentatieDetailItemComponent implements OnInit {

  @Input() slide: any;
  editText = false;
  uploadVideo = false;
  files: UploadFile[] = [];
  isUploading = false;
  showVideo = false;

  constructor(private slidesService: SlidesService, private actionSheetController: ActionSheetController) {
  }

  ngOnInit() {
    if (this.slide.video) {
      this.showVideo = true;
    }
  }

  openEdit() {
    this.editText = true;
  }

  changeSlideTekst(tekst) {
    this.slide.slide.tekst = tekst.textContent;
    this.slidesService.updateSlide(this.slide.slide, this.slide.slide.ID)
      .subscribe(resp => {
        this.editText = false;
      });
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.isUploading = true;

          // upload
          this.slidesService.uploadVideo(file, this.slide.slide.ID).subscribe(resp => {
            this.isUploading = false;
            this.slidesService.getSlides(this.slide.slide.presentatieID);
            console.log(resp);
          });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Slide ' + this.slide.slide.volgnummer,
      buttons: [{
        text: 'Bewerken',
        icon: 'create',
        handler: () => {
          this.showVideo = false;
          this.uploadVideo = true;
        }
      }, {
        text: 'Verwijderen',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.slidesService.deleteVideo(this.slide.slide.ID).subscribe(resp => {
            this.showVideo = false;
          });
        }
      }, {
        text: 'Annuleren',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }}
