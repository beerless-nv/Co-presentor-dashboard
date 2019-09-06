import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {SettingsTtsPage} from './settings-tts.page';
import {SettingsTtsPauzesItemComponent} from '../../components/settings-tts-pauzes-item/settings-tts-pauzes-item.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsTtsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    SettingsTtsPauzesItemComponent,
  ],
  declarations: [
    SettingsTtsPage,
    SettingsTtsPauzesItemComponent
  ]
})
export class SettingsTtsPageModule {
}
