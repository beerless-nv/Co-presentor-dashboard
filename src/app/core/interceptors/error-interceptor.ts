import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {CookieService} from 'ngx-cookie-service';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ErrorSuccessMessagesService} from '../../shared/services/error-success-messages/error-success-messages.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public alertController: AlertController, public toastController: ToastController, private cookieService: CookieService, private errorSuccessMessagesService: ErrorSuccessMessagesService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // set bearer token
    const token = this.cookieService.get('access_token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      tap(evt => {
        // // Subscribe to success messages
        // this.errorSuccessMessagesService.successMessage$.subscribe(async msg => {
        //   if (evt instanceof HttpResponse) {
        //     console.log(msg);
        //
        //     if (evt.statusText === 'OK') {
        //       if (msg) {
        //         console.log('definitie verwijderen');
        //         await this.presentToast(msg);
        //         this.errorSuccessMessagesService.successMessage$.next(null);
        //       }
        //     }
        //   }
        // });
      }),
      catchError((err: any) => {
        // Subscribe to error messages
        let errorMessage;
        this.errorSuccessMessagesService.errorMessage$.subscribe(msg => {
          errorMessage = msg;
        });

        if (errorMessage) {
          this.presentAlert(errorMessage);
        } else if (err instanceof HttpErrorResponse) {
          try {
            this.presentAlert(err.error.error.message);
          } catch (e) {
            this.presentAlert('Een onbekende error is opgetreden. Probeer opnieuw!');
          }
        }

        return of(err);
      }));
  }

  async presentAlert(msg: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
