import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {SignInService} from '../../../sign-in/shared/sign-in.service';
import {SignUpService} from '../../shared/sign-up.service';

@Component({
  selector: 'app-sign-up-overzicht',
  templateUrl: './sign-up-overzicht.page.html',
  styleUrls: ['./sign-up-overzicht.page.scss'],
})
export class SignUpOverzichtPage implements OnInit {

  signupForm: FormGroup;
  passwordVisible = false;

  constructor(public menuController: MenuController, private signUpService: SignUpService, private router: Router) {
    this.menuController.enable(false);
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  signUp() {
    if (this.signupForm.valid) {
      this.signUpService.signUp(this.signupForm.value).subscribe((resp: any) => {
        if (resp.ID) {
          this.router.navigate(['/sign-in']);
        }
      });
    }
  }
}
