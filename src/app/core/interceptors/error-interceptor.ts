import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {CookieService} from 'ngx-cookie-service';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public alertController: AlertController, public toastController: ToastController, private cookieService: CookieService) {
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
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            this.presentAlert(err.error.error);
          } catch (e) {
            this.presentAlert('Een onbekende error is opgetreden. Probeer opnieuw!');
          }
        }
        return of(err);
      }));
  }

  async presentAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: error.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

}
