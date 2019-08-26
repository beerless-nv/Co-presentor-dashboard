import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {SignInOverzichtPage} from './sign-in-overzicht.page';

const routes: Routes = [
  {
    path: '',
    component: SignInOverzichtPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [SignInOverzichtPage]
})
export class SignInOverzichtPageModule {
}
