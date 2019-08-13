import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PresentatiesService} from '../../shared/presentaties.service';

@Component({
  selector: 'app-presentatie-detail',
  templateUrl: './presentatie-detail.page.html',
  styleUrls: ['./presentatie-detail.page.scss'],
})
export class PresentatieDetailPage implements OnInit {

  slides: any;
  presentatie: any;
  editText = false;

  constructor(private presentatiesService: PresentatiesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.getSlides(params.id);
      this.getPresentatie(params.id);
    });
  }

  getSlides(presentatieId) {
    this.slides = this.presentatiesService.getSlides(presentatieId);
  }

  getPresentatie(presentatieId) {
    this.presentatie = this.presentatiesService.getPresentatie(presentatieId);
  }

}
