import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignUpOverzichtPage } from './sign-up-overzicht.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpOverzichtPage
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
  declarations: [SignUpOverzichtPage]
})
export class SignUpOverzichtPageModule {}
