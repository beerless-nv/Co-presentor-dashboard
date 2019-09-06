import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/settings-overzicht/settings-overzicht.module#SettingsOverzichtPageModule'
  },
  {
    path: 'text-to-speech',
    loadChildren: './pages/settings-tts/settings-tts.module#SettingsTtsPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
