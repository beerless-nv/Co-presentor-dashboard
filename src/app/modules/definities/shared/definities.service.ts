import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {SynoniemenService} from '../../../shared/services/synoniemen/synoniemen.service';

@Injectable({
  providedIn: 'root'
})
export class DefinitiesService {

  readonly urlDefinities = environment.backend + 'definities';
  public definities: BehaviorSubject<any> = new BehaviorSubject(null);
  public definitie: BehaviorSubject<any> = new BehaviorSubject(null);


  constructor(public http: HttpClient, private synoniemenService: SynoniemenService) {
    this.getDefinities();
  }

  getDefinities() {
    return this.http.get(this.urlDefinities).subscribe((definities: Array<any>) => {

      const definitiesArray = [];

      definities.map(definitie => {
        this.synoniemenService.getSynoniemenByFK(0, definitie.ID).subscribe( (synoniemen: Array<any>) => {
          console.log(synoniemen);
          definitie.synoniemen = synoniemen;
          definitiesArray.push(definitie);
        });
      });

      this.definities.next(definitiesArray);

    });
  }

  getDefinitie(id) {
    return this.http.get(this.urlDefinities + '/' + id).subscribe((definitie: any) => {
      this.synoniemenService.getSynoniemenByFK(0, definitie.ID).subscribe((synoniemen: Array<any>) => {
            definitie.synoniemen = synoniemen;
            this.definitie.next(definitie);
          });
    });
  }

  filterDefinities(value) {
    return this.definities.value.filter(definitie => {
      return definitie.naam.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
  }

  createDefinitie(definitie) {
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
