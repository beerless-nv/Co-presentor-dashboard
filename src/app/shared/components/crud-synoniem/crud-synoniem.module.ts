import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {CrudSynoniemComponent} from './crud-synoniem.component';

@NgModule({
  declarations: [
    CrudSynoniemComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CrudSynoniemComponent
  ]
})
export class CrudSynoniemModule { }
