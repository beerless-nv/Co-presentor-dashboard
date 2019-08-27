import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {ErrorSuccessMessagesService} from '../../../shared/services/error-success-messages/error-success-messages.service';
import {SynoniemenService} from '../../../shared/services/synoniemen/synoniemen.service';
import {SlidesService} from './slides.service';

@Injectable({
  providedIn: 'root'
})
export class PresentatiesService {

  readonly urlPresentaties = environment.backend + 'presentaties';
  public presentaties: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private synoniemenService: SynoniemenService, private slidesService: SlidesService, private errorSuccessMessagesService: ErrorSuccessMessagesService) {
    this.getPresentaties();
  }

  getPresentaties() {
    return this.http.get(this.urlPresentaties).subscribe((presentaties: Array<any>) => {
      const presentatiesArray = [];

      presentaties.map(presentatie => {
        this.slidesService.getSlide(1, presentatie.ID).subscribe(slide => {
          presentatie.slide = slide[0];
        });

        this.synoniemenService.getSynoniemenByFK(presentatie.ID, 0).subscribe((synoniemen: Array<any>) => {
          presentatie.synoniemen = synoniemen;
          presentatiesArray.push(presentatie);
          presentatiesArray.sort((a, b) => {
            return a.ID - b.ID;
          });
        });
      });

      return this.presentaties.next(presentatiesArray);
    });
  }

  deletePresentatie(presentatieId) {
    return this.http.delete(this.urlPresentaties + '/' + presentatieId)
      .pipe(
        tap(resp => {
          console.log('verwijderd');
          this.errorSuccessMessagesService.createSuccessMessage('Presentatie is verwijderd.');
        })
      )
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
    return this.http.post(this.urlPresentaties, presentatie)
      .pipe(
        tap(resp => {
          this.errorSuccessMessagesService.successMessage$.next('Presentatie is aangemaakt.');
        })
      );
  }

  updatePresentatie(presentatie, presentatieId) {
    return this.http.patch(this.urlPresentaties + '/' + presentatieId, presentatie)
      .pipe(
        tap(resp => {
          this.errorSuccessMessagesService.successMessage$.next('Presentatie is aangepast.');
        })
      );
  }

  uploadPresentatie(file, presentatie) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(environment.backend + 'uploadPresentatie/' + presentatie.ID + '/' + presentatie.naam, formData)
      .pipe(
        tap(resp => {
          this.errorSuccessMessagesService.successMessage$.next('Presentatie is geüpload.');
        })
      );
  }
}
