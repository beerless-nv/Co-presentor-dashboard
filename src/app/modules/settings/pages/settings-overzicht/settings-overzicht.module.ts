import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {SettingsOverzichtPage} from './settings-overzicht.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsOverzichtPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    SettingsOverzichtPage,
  ]
})
export class SettingsOverzichtPageModule {
}
