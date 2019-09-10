import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ControlsOverzichtPage } from './controls-overzicht.page';

const routes: Routes = [
  {
    path: '',
    component: ControlsOverzichtPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ControlsOverzichtPage]
})
export class ControlsOverzichtPageModule {}
