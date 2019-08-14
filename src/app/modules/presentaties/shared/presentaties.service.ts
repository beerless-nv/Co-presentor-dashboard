import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresentatiesService {

  readonly urlPresentaties = environment.backend + 'presentaties';
  public presentaties: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.getPresentaties();
  }

  getPresentaties() {
    return this.http.get(this.urlPresentaties).subscribe(presentaties => {
      this.presentaties.next(presentaties);
    });
  }

  deletePresentatie(presentatieId) {
    return this.http.delete(this.urlPresentaties + '/' + presentatieId)
      .subscribe(() => {
        this.getPresentaties();
      });
  }

  filterPresentaties(value) {
    return this.presentaties.value.filter(presentatie => {
      return presentatie.naam.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
  }

  getPresentatie(presentatieId) {
    return this.http.get(this.urlPresentaties + '/' + presentatieId);
  }

  createPresentatie(presentatie) {
    return this.http.post(this.urlPresentaties, presentatie);
  }

  updatePresentatie(presentatie, presentatieId) {
    return this.http.patch(this.urlPresentaties + '/' + presentatieId, presentatie);
  }

  uploadPresentatie(file, presentatie) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(environment.backend + 'uploadPresentatie/' + presentatie.ID + '/' + presentatie.naam, formData);
  }

  getSlides(presentatieId) {
    const params = new HttpParams()
      .append('filter[where][presentatieID]', presentatieId)
      .append('filter[order]', 'volgnummer');

    return this.http.get(environment.backend + 'slides', {params});
  }

  getSlide(volgnummer, presentatieId) {
    const params = new HttpParams()
      .append('filter[where][presentatieID]', presentatieId)
      .append('filter[where][volgnummer]', volgnummer);

    return this.http.get(environment.backend + 'slides', {params});
  }

  updateSlide(slide, slideId) {
    return this.http.patch(environment.backend + '/slides/' + slideId, slide);
  }

}
