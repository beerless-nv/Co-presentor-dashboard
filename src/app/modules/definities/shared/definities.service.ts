import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {ErrorSuccessMessagesService} from '../../../shared/services/error-success-messages/error-success-messages.service';
import {SynoniemenService} from '../../../shared/services/synoniemen/synoniemen.service';
import parseTextToSSML from '../../../shared/scripts/parseTextToSSML';

@Injectable({
  providedIn: 'root'
})
export class DefinitiesService {

  readonly urlDefinities = environment.backend + 'definities';
  public definities: BehaviorSubject<any> = new BehaviorSubject(null);
  public definitie: BehaviorSubject<any> = new BehaviorSubject(null);


  constructor(public http: HttpClient, private synoniemenService: SynoniemenService, private errorSuccessMessagesService: ErrorSuccessMessagesService) {
    this.getDefinities();
  }

  getDefinities() {
    return this.http.get(this.urlDefinities).subscribe((definities: Array<any>) => {

      const definitiesArray = [];

      definities.map(definitie => {
        this.synoniemenService.getSynoniemenByFK(0, definitie.ID).subscribe( (synoniemen: Array<any>) => {
          definitie.synoniemen = synoniemen;
          definitiesArray.push(definitie);
          definitiesArray.sort((a, b) => {
            return a.naam.localeCompare(b.naam);
          });
        });
      });

      return this.definities.next(definitiesArray);

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
    definitie.ssml = parseTextToSSML(definitie.tekst);
    return this.http.post(this.urlDefinities, definitie)
      .pipe(
        tap(resp => {
          this.errorSuccessMessagesService.successMessage$.next('Definitie is aangemaakt.');
        })
      );
  }

  updateDefinitie(definitie, definitieId) {
    definitie.ssml = parseTextToSSML(definitie.tekst);
    return this.http.patch(this.urlDefinities + '/' + definitieId, definitie)
      .pipe(
        tap(resp => {
          this.errorSuccessMessagesService.successMessage$.next('Definitie is aangepast.');
        })
      );
  }

  deleteDefinitie(definitieId) {
    return this.http.delete(this.urlDefinities + '/' + definitieId)
      .pipe(
        tap(resp => {
          this.errorSuccessMessagesService.successMessage$.next('Definitie is verwijderd.');
        })
      );
  }
}
