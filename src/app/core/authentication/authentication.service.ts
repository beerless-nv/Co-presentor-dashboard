import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(private cookieService: CookieService, private platform: Platform, private router: Router) {
    this.platform.ready().then(() => {
      this.isLoggedIn();
    });
  }

  isLoggedIn() {
    const accessToken = this.cookieService.get('access_token');
    if (accessToken) {
      this.authState.next(true);
    } else {
      this.authState.next(false);
      this.router.navigate(['/sign-in']);
    }
  }

  isAuthenticated() {
    return this.authState.value;
  }

  logout() {
    this.cookieService.delete('access_token');
  }
}
