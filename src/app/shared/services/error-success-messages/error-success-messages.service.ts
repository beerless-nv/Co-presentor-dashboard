import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorSuccessMessagesService {

  errorMessage$: BehaviorSubject<string> = new BehaviorSubject(null);
  successMessage$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private toastController: ToastController) {
    this.errorMessage$.subscribe(msg => {

    });

    this.successMessage$.subscribe(msg => {
      if (msg) {
        this.presentToast(msg);
      }
    });
  }

  createErrorMessage(msg) {
    this.errorMessage$.next(msg);
    setTimeout(() => this.errorMessage$.next(null), 200);
  }

  createSuccessMessage(msg) {
    this.successMessage$.next(msg);
    setTimeout(() => this.successMessage$.next(null), 200);
  }

  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
