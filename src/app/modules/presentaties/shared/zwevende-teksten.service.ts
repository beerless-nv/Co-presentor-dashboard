import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZwevendeTekstenService {

  readonly urlZwevendeTeksten = environment.backend + 'zwevende-teksten';

  constructor(public http: HttpClient) {
  }

  getZwevendeTekstenByPresentatieId(presentatieId) {
    return this.http.get(environment.backend + 'presentaties/' + presentatieId + '/zwevende-teksts');
  }

  updateZwevendeTekst(id, zwevendeTekst) {
    return this.http.patch(this.urlZwevendeTeksten + '/' + id, zwevendeTekst);
  }

  deleteZwevendeTekst(id) {
    return this.http.delete(this.urlZwevendeTeksten + '/' + id);
  }
}
