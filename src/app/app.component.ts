import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AlertController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthenticationService} from './core/authentication/authentication.service';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Presentaties',
      url: '/presentaties',
      icon: 'tv'
    },
    {
      title: 'Definities',
      url: '/definities',
      icon: 'list'
    },
    {
      title: 'Controls',
      url: '/controls',
      icon: 'phone-portrait'
    },
    {
      title: 'Downloads',
      url: '/downloads',
      icon: 'appstore'
    },
    {
      title: 'Instellingen',
      url: '/instellingen',
      icon: 'settings'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private swUpdate: SwUpdate,
    private alertController: AlertController
  ) {
    this.initializeApp();
    this.updateAvailable();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.authState.subscribe(state => {
        if (!state) {
          this.router.navigate(['/sign-in']);
        }
      });
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  updateAvailable() {
    this.swUpdate.available.subscribe(evt => {
      this.presentAlert().then(resp => {
        window.location.reload();
      });
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Update',
      message: 'De app is aangepast en er is een nieuwe update beschikbaar.',
      buttons: ['Update']
    });

    await alert.present();
  }
}
