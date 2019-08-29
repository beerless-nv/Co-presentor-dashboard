import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleTtsSttService {

  readonly urlTts = 'https://texttospeech.googleapis.com/v1/text:synthesize';

  constructor(public http: HttpClient) { }

  tts(text) {
    const headers = new HttpHeaders()
      .append('X-Goog-Api-Key', environment.googleTtsSttAPIKey);

    return this.http.post(this.urlTts, text, {headers});
  }
}
