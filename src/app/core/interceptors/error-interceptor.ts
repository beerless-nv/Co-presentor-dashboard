import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {CookieService} from 'ngx-cookie-service';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ErrorSuccessMessagesService} from '../../shared/services/error-success-messages/error-success-messages.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public alertController: AlertController, public toastController: ToastController, private cookieService: CookieService, private errorSuccessMessagesService: ErrorSuccessMessagesService, private authenticationService: AuthenticationService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // set bearer token if no token is set
    if (!req.headers.get('X-Goog-Api-Key') && !req.headers.get('no-auth')) {
      const token = this.cookieService.get('access_token');
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    if (req.headers.get('no-auth')) {
      req = req.clone({headers: req.headers.delete('no-auth')});
    }

    return next.handle(req).pipe(
      tap(evt => {
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
            if (err.error.error.message === 'Error verifying token: invalid token' || err.error.error.statusCode === 401) {
              this.cookieService.delete('access_token');
              this.authenticationService.isLoggedIn();
            } else if (err.error.error.statusCode === 422) {
              if (err.error.error.details) {
                const details = err.error.error.details[0];
                const msg = details.path.substr(1) + ' ' + details.message;
                this.presentAlert(msg);
              } else {
                this.presentAlert(err.error.error.message);
              }
            } else {
              this.presentAlert(err.error.error.message);
            }
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
