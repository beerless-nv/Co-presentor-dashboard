import {AfterContentInit, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {CookieService} from 'ngx-cookie-service';
import {AuthenticationService} from '../../../../core/authentication/authentication.service';
import {SignInService} from '../../shared/sign-in.service';

@Component({
  selector: 'app-sign-in-overzicht',
  templateUrl: './sign-in-overzicht.page.html',
  styleUrls: ['./sign-in-overzicht.page.scss'],
})
export class SignInOverzichtPage implements OnInit {

  loginForm: FormGroup;
  passwordVisible = false;
  isLogging = false;

  constructor(public menuController: MenuController, private signInService: SignInService, private router: Router, private cookieService: CookieService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ionViewWillEnter() {
    this.isLogging = false;
    this.menuController.enable(false);
  }

  ionViewWillLeave() {
    this.menuController.enable(true);
  }

  login() {
    if (this.loginForm.valid) {
      this.isLogging = true;

      this.signInService.login(this.loginForm.value).subscribe((resp: any) => {
        if (resp.token) {
          setTimeout(() => {
            // set token in cookies
            this.cookieService.set('access_token', resp.token, new Date((new Date()).getTime() + 604000000));

            // call loggedIn
            this.authenticationService.isLoggedIn();

            // navigate to home
            this.router.navigate(['/']);
          }, 500);
        }
      });
    }
  }
}
