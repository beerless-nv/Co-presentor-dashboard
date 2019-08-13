import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PresentatiesService} from '../../shared/presentaties.service';

@Component({
  selector: 'app-presentatie-detail-item',
  templateUrl: './presentatie-detail-item.component.html',
  styleUrls: ['./presentatie-detail-item.component.scss'],
})
export class PresentatieDetailItemComponent implements OnInit {

  @Input() slide: any;
  @ViewChild('tekst') textarea: ElementRef;
  editText = false;

  constructor(private presentatiesService: PresentatiesService) {
  }

  ngOnInit() {
  }

  openEdit() {
    this.editText = true;

    if (this.textarea !== undefined) {
      this.textarea.nativeElement.innerHTML = this.slide.slide.tekst;
    }
  }

  changeSlideTekst(tekst: string) {
    this.slide.slide.tekst = tekst;
    this.presentatiesService.updateSlide(this.slide.slide, this.slide.slide.ID)
      .subscribe(resp => {
        this.editText = false;
      });
  }
}
