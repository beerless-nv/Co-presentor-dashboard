import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import parseTextToSSML from '../../../shared/scripts/parseTextToSSML';
import {ErrorSuccessMessagesService} from '../../../shared/services/error-success-messages/error-success-messages.service';
import {TtsInstellingenService} from '../../../shared/services/tts-instellingen/tts-instellingen.service';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  readonly urlSlides = environment.backend + 'slides';
  public slides: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private errorSuccessMessagesService: ErrorSuccessMessagesService, private ttsInstellingenService: TtsInstellingenService) {
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
    slide.ssml = parseTextToSSML(slide.tekst, this.ttsInstellingenService.getBreakTimes());
    return this.http.patch(this.urlSlides + '/' + slideId, slide)
      .pipe(
        tap(resp => {
          this.errorSuccessMessagesService.successMessage$.next('Slide is aangepast.');
        })
      );
  }

  async updateAllSlidesTekst() {
    const params = new HttpParams()
      .append('filter[where][tekst][neq]', '');
    return this.http.get<Array<any>>(this.urlSlides, {params}).toPromise().then(async slides => {
      slides.map(slide => {
        slide = slide.slide;
        slide.ssml = parseTextToSSML(slide.tekst, this.ttsInstellingenService.getBreakTimes());
      });

      await this.http.patch(this.urlSlides + '/bulk', slides).toPromise();

      return 'done';
    });
  }

  uploadVideo(video, slideId) {
    const formData = new FormData();
    formData.append('file', video);

    return this.http.post(environment.backend + 'uploadVideo/' + slideId, formData)
      .pipe(
        tap(resp => {
          this.errorSuccessMessagesService.successMessage$.next('Video is geüpload.');
        })
      );
  }

  deleteVideo(slideId) {
    return this.http.delete(environment.backend + 'deleteVideo/' + slideId)
      .pipe(
        tap(resp => {
          this.errorSuccessMessagesService.successMessage$.next('Video is verwijderd.');
        })
      );
  }
}
