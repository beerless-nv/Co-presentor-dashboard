import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SynoniemenService {

  readonly urlSynoniemen = environment.backend + 'synoniems';

  constructor(public http: HttpClient) {
  }

  getSynoniemen() {
    return this.http.get(this.urlSynoniemen);
  }

  getSynoniemenByFK(presentatieId, definitieId) {
    const params = new HttpParams()
      .append('filter[where][presentatieId]', presentatieId)
      .append('filter[where][definitieId]', definitieId);

    return this.http.get(this.urlSynoniemen, {params});
  }

  createSynoniem(synoniem: any) {
    return this.http.post(this.urlSynoniemen, synoniem);
  }

  updateSynoniem(synoniem: any, id: number) {
    return this.http.patch(this.urlSynoniemen + '/' + id, synoniem);
  }

  deleteSynoniem(id: number) {
    return this.http.delete(this.urlSynoniemen + '/' + id);
  }
}
