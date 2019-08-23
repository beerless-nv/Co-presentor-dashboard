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

  updateSynoniem(synoniemen: any, presentatieId, definitieId) {
    // change object
    synoniemen.map(synoniem => {
      delete synoniem.ID;
      synoniem.presentatieId = presentatieId;
      synoniem.definitieId = definitieId;
    });
    const obj = {
      synoniemen,
      presentatieId,
      definitieId
    };

    return this.http.post(environment.backend + 'updateSynoniemen', obj);
  }
}
