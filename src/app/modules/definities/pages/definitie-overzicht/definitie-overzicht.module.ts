import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {DefinitieItemComponent} from '../../components/definitie-item/definitie-item.component';
import {DefinitieSynoniemComponent} from '../../components/definitie-synoniem/definitie-synoniem.component';
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
    ReactiveFormsModule,
    NgbCollapseModule
  ],
  declarations: [
    DefinitieOverzichtPage,
    DefinitieItemComponent,
    UpdateDefinitieComponent,
    DefinitieSynoniemComponent
  ],
  entryComponents: [
    UpdateDefinitieComponent
  ]
})
export class DefinitieOverzichtPageModule {}
