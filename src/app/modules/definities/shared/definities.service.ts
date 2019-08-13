import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefinitiesService {

  readonly urlDefinities = environment.backend + 'definities';
  public definities: BehaviorSubject<any> = new BehaviorSubject(null);


  constructor(public http: HttpClient) {
    this.getDefinities();
  }

  getDefinities() {
    return this.http.get(this.urlDefinities).subscribe(definities => {
      this.definities.next(definities);
    });
  }

  filterDefinities(value) {
    return this.definities.value.filter(definitie => {
      return definitie.naam.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
  }

  createDefinitie(definitie) {
    // temporary fix
    definitie.categorieID = 1;

    return this.http.post(this.urlDefinities, definitie)
      .subscribe(() => {
        this.getDefinities();
      });
  }

  updateDefinitie(definitie, definitieId) {
    return this.http.patch(this.urlDefinities + '/' + definitieId, definitie)
      .subscribe(() => {
        this.getDefinities();
      });
  }

  deleteDefinitie(definitieId) {
    return this.http.delete(this.urlDefinities + '/' + definitieId)
      .subscribe(() => {
        this.getDefinities();
      });
  }
}
