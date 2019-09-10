import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {

  readonly urlControls = environment.backend + 'sendMessage';

  constructor(public http: HttpClient) { }

  startListening() {
    return this.http.get(this.urlControls + '/startListening').subscribe();
  }

  stopListening() {
    return this.http.get(this.urlControls + '/stopListening').subscribe();
  }

  nextSlide() {
    return this.http.get(this.urlControls + '/nextSlide').subscribe();
  }

  previousSlide() {
    return this.http.get(this.urlControls + '/previousSlide').subscribe();
  }

  enterFullScreen() {
    return this.http.get(this.urlControls + '/enterFullScreen').subscribe();
  }

  exitFullScreen() {
    return this.http.get(this.urlControls + '/exitFullScreen').subscribe();
  }

  startSpeaking() {
    return this.http.get(this.urlControls + '/startSpeaking').subscribe();
  }

  startVideo() {
    return this.http.get(this.urlControls + '/startVideo').subscribe();
  }
}
