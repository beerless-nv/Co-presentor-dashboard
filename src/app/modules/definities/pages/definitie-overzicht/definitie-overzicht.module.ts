import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {DefinitieItemComponent} from '../../components/definitie-item/definitie-item.component';
import {UpdateDefinitieComponent} from '../../components/update-definitie/update-definitie.component';

import { DefinitieOverzichtPage } from './definitie-overzicht.page';

const routes: Routes = [
  {
    path: '',
    component: DefinitieOverzichtPage
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
  declarations: [
    DefinitieOverzichtPage,
    DefinitieItemComponent,
    UpdateDefinitieComponent
  ],
  entryComponents: [
    UpdateDefinitieComponent
  ]
})
export class DefinitieOverzichtPageModule {}
