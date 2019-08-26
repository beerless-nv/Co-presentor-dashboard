import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../../environments/environment';
import parseTextToSSML from '../../../shared/scripts/parseTextToSSML';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  readonly urlSlides = environment.backend + 'slides';
  public slides: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  getSlides(presentatieId) {
    const params = new HttpParams()
      .append('filter[where][presentatieID]', presentatieId)
      .append('filter[order]', 'volgnummer');

    return this.http.get(this.urlSlides, {params}).subscribe(slides => {
      this.slides.next(slides);
    });
  }

  getSlide(volgnummer, presentatieId) {
    const params = new HttpParams()
      .append('filter[where][presentatieID]', presentatieId)
      .append('filter[where][volgnummer]', volgnummer);

    return this.http.get(this.urlSlides, {params});
  }

  updateSlide(slide, slideId) {
    slide.ssml = parseTextToSSML(slide.tekst);
    return this.http.patch(this.urlSlides + '/' + slideId, slide);
  }

  uploadVideo(video, slideId) {
    const formData = new FormData();
    formData.append('file', video);

    return this.http.post(environment.backend + 'uploadVideo/' + slideId, formData);
  }

  deleteVideo(slideId) {
    return this.http.delete(environment.backend + 'deleteVideo/' + slideId);
  }
}
