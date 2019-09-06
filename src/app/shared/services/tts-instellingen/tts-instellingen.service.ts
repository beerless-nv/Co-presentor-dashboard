import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TtsInstellingenService {

  readonly urlTtsInstellingen = environment.backend + '/tts-instellingen';
  ttsInstellingen$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public http: HttpClient) {
    console.log('get instellingen');
    this.getTtsInstellingen();
  }

  getBreakTimes() {
    if (this.ttsInstellingen$.value !== null) {
      return this.ttsInstellingen$.value;
    } else {
      this.getTtsInstellingen();
    }
  }

  getTtsInstellingen() {
    return this.http.get(this.urlTtsInstellingen).subscribe(ttsInstellingen => this.ttsInstellingen$.next(ttsInstellingen));
  }

  updateTtsInstellingen(pauzeItemId, pauzeItem) {
    return this.http.patch(this.urlTtsInstellingen + '/' + pauzeItemId, pauzeItem);
  }
}
