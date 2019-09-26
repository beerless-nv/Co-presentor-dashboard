import { Component, OnInit } from '@angular/core';
import {ControlsService} from '../../shared/controls.service';

@Component({
  selector: 'app-controls-overzicht',
  templateUrl: './controls-overzicht.page.html',
  styleUrls: ['./controls-overzicht.page.scss'],
})
export class ControlsOverzichtPage implements OnInit {

  constructor(
    private controlsService: ControlsService
  ) { }

  ngOnInit() {
  }

  startListening() {
    this.controlsService.startListening();
  }

  stopListening() {
    this.controlsService.stopListening();
  }

  nextSlide() {
    this.controlsService.nextSlide();
  }

  previousSlide() {
    this.controlsService.previousSlide();
  }

  enterFullScreen() {
    this.controlsService.enterFullScreen();
  }

  exitFullScreen() {
    this.controlsService.exitFullScreen();
  }

  startSpeaking() {
    this.controlsService.startSpeaking();
  }

  startVideo() {
    this.controlsService.startVideo();
  }
}
